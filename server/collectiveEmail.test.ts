import { afterEach, describe, expect, it, vi } from "vitest";
import { collectiveIdeaSchema, sendCollectiveIdeaEmail } from "./collectiveEmail";

const validIdea = {
  name: "Ana Silva",
  municipality: "Natal",
  neighborhood: "Tirol",
  theme: "Saúde",
  message: "Mais atendimento no bairro.",
  contact: "ana@example.com",
  consent: true,
  website: "",
};

afterEach(() => vi.restoreAllMocks());

describe("collective idea form", () => {
  it("requires consent and a non-empty message", () => {
    expect(collectiveIdeaSchema.safeParse({ ...validIdea, consent: false }).success).toBe(false);
    expect(collectiveIdeaSchema.safeParse({ ...validIdea, message: "" }).success).toBe(false);
  });

  it("accepts up to 500 characters for the idea and honeypot fields", () => {
    expect(collectiveIdeaSchema.safeParse({ ...validIdea, message: "a".repeat(500), website: "a".repeat(500) }).success).toBe(true);
    expect(collectiveIdeaSchema.safeParse({ ...validIdea, message: "a".repeat(501) }).success).toBe(false);
    expect(collectiveIdeaSchema.safeParse({ ...validIdea, website: "a".repeat(501) }).success).toBe(false);
  });

  it("sends the complete contribution to both configured recipients", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: "email-id" }), { status: 200 }),
    );

    await expect(sendCollectiveIdeaEmail(validIdea)).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const request = fetchMock.mock.calls[0];
    const body = JSON.parse(String(request[1]?.body));
    expect(body.to).toEqual(["Susapezap@gmail.com", "suporte.luminamulher@gmail.com"]);
    expect(body.text).toContain("Mais atendimento no bairro.");
    expect(body.reply_to).toBe("ana@example.com");
  });

  it("returns false when the email provider rejects the message", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ message: "rejected" }), { status: 400 }),
    );

    await expect(sendCollectiveIdeaEmail(validIdea)).resolves.toBe(false);
  });
});
