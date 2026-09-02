import { z } from "zod";
import { ENV } from "./_core/env";

export const collectiveIdeaSchema = z.object({
  name: z.string().trim().min(1, "Informe o seu nome.").max(100),
  municipality: z.string().trim().min(1, "Informe o seu município.").max(100),
  neighborhood: z.string().trim().max(100).optional().default(""),
  theme: z.string().trim().min(1, "Escolha um tema.").max(100),
  message: z.string().trim().min(1, "Escreva a sua ideia.").max(500),
  contact: z.string().trim().max(320).optional().default(""),
  consent: z.boolean().refine(value => value, "É necessário aceitar o uso dos dados."),
  website: z.string().max(500).optional().default(""),
});

export type CollectiveIdea = z.infer<typeof collectiveIdeaSchema>;

const RECIPIENTS = ["Susapezap@gmail.com", "suporte.luminamulher@gmail.com"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function formatContact(contact: string) {
  return contact && EMAIL_PATTERN.test(contact) ? contact : "Não informado";
}

export async function sendCollectiveIdeaEmail(input: CollectiveIdea) {
  if (!ENV.resendApiKey || !ENV.resendFromEmail) {
    console.error("[collective-email] Resend is not configured");
    return false;
  }

  const submittedAt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Fortaleza",
  }).format(new Date());
  const contact = formatContact(input.contact ?? "");
  const subject = `Nova contribuição da Construção Coletiva — ${input.theme}`;
  const text = [
    "Nova contribuição recebida pela Construção Coletiva",
    "",
    `Nome: ${input.name}`,
    `Município: ${input.municipality}`,
    `Bairro: ${input.neighborhood || "Não informado"}`,
    `Tema: ${input.theme}`,
    `Contacto: ${contact}`,
    `Data: ${submittedAt}`,
    "",
    "Ideia, problema ou proposta:",
    input.message,
  ].join("\n");
  const html = `
    <h2>Nova contribuição recebida pela Construção Coletiva</h2>
    <p><strong>Nome:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Município:</strong> ${escapeHtml(input.municipality)}</p>
    <p><strong>Bairro:</strong> ${escapeHtml(input.neighborhood || "Não informado")}</p>
    <p><strong>Tema:</strong> ${escapeHtml(input.theme)}</p>
    <p><strong>Contacto:</strong> ${escapeHtml(contact)}</p>
    <p><strong>Data:</strong> ${escapeHtml(submittedAt)}</p>
    <h3>Ideia, problema ou proposta</h3>
    <p>${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ENV.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: ENV.resendFromEmail,
        to: RECIPIENTS,
        subject,
        text,
        html,
        ...(contact !== "Não informado" ? { reply_to: contact } : {}),
      }),
    });

    if (!response.ok) {
      console.error("[collective-email] Resend rejected message", response.status, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[collective-email] Resend request failed", error);
    return false;
  }
}
