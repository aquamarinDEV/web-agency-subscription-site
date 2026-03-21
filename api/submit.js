import { kv } from "@vercel/kv";

export const config = {
  api: { bodyParser: true },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { nume, firma, email, telefon, pachet, mesaj } = req.body || {};

    if (!nume || !email || !telefon || !pachet || !mesaj) {
      return res.status(400).json({ error: "Lipsesc campuri obligatorii" });
    }

    const submission = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      nume: String(nume).trim(),
      firma: String(firma || "").trim(),
      email: String(email).trim(),
      telefon: String(telefon).trim(),
      pachet: String(pachet).trim(),
      mesaj: String(mesaj).trim(),
      createdAt: new Date().toISOString(),
    };

    await kv.lpush("contact_submissions", JSON.stringify(submission));

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Eroare la salvare" });
  }
}
