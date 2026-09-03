const from = process.env.RESEND_FROM_EMAIL || "Susapezap@gmail.com";
const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) throw new Error("RESEND_API_KEY ausente");

const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from,
    to: ["Susapezap@gmail.com", "suporte.luminamulher@gmail.com"],
    subject: "[Teste técnico] Construção Coletiva",
    text: "Teste técnico de entrega do formulário da Construção Coletiva. Nenhuma ação é necessária.",
  }),
});

const body = await response.text();
console.log(JSON.stringify({ status: response.status, body }));
if (!response.ok) process.exitCode = 1;
