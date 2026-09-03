const from = process.env.RESEND_FROM_EMAIL || "Susapezap@gmail.com";
const apiKey = process.env.RESEND_API_KEY;
const headers = { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" };

if (!apiKey) throw new Error("RESEND_API_KEY ausente");

const sendResponse = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers,
  body: JSON.stringify({
    from,
    to: ["Susapezap@gmail.com", "suporte.luminamulher@gmail.com"],
    subject: "[Teste técnico] Entrega da Construção Coletiva",
    text: "Teste técnico de entrega do formulário da Construção Coletiva. Nenhuma ação é necessária.",
  }),
});
const sendBody = await sendResponse.json();
console.log(JSON.stringify({ send_status: sendResponse.status, send_body: sendBody }));
if (!sendResponse.ok || !sendBody.id) process.exit(1);

const statusResponse = await fetch(`https://api.resend.com/emails/${sendBody.id}`, { headers });
const statusBody = await statusResponse.text();
console.log(JSON.stringify({ status_lookup: statusResponse.status, status_body: statusBody }));
