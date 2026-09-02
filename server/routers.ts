import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { collectiveIdeaSchema, sendCollectiveIdeaEmail } from "./collectiveEmail";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  collective: router({
    submit: publicProcedure
      .input(collectiveIdeaSchema)
      .mutation(async ({ input }) => {
        // Honeypot submissions are acknowledged without sending spam.
        if (input.website) return { success: true } as const;
        const delivered = await sendCollectiveIdeaEmail(input);
        if (!delivered) {
          throw new Error("Não foi possível encaminhar a contribuição agora.");
        }
        return { success: true } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
