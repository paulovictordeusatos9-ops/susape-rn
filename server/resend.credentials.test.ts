import { describe, expect, it } from "vitest";

describe("Resend credentials", () => {
  it("authenticates against the Resend email endpoint without sending a message", async () => {
    const apiKey = process.env.RESEND_API_KEY;
    expect(apiKey, "RESEND_API_KEY must be configured").toBeTruthy();

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    // An authenticated request with an intentionally invalid payload is rejected
    // before delivery; 401/403 would indicate an invalid or unusable credential.
    expect(response.status, await response.text()).not.toBe(401);
    expect(response.status).not.toBe(403);
    expect(response.status).toBe(422);
  }, 15_000);
});
