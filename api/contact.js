import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, business, email, service, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // change once you verify a domain
      to: "asma.kamali@outlook.com",
      subject: `New enquiry from ${name}${business ? ` — ${business}` : ""}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Business:</strong> ${business || "—"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service || "—"}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "—"}</p>
      `,
      reply_to: email,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
