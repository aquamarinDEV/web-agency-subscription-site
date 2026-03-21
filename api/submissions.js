import { kv } from "@vercel/kv";

function getCookie(req, name) {
  const c = req.headers?.cookie || "";
  const m = c.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = getCookie(req, "admin_session");
  if (!token) {
    return res.status(401).json({ error: "Neautentificat" });
  }

  const valid = await kv.get(`session:${token}`);
  if (!valid) {
    return res.status(401).json({ error: "Sesiune expirata" });
  }

  try {
    const raw = await kv.lrange("contact_submissions", 0, -1);
    const submissions = (raw || []).map((s) => {
      try {
        return typeof s === "string" ? JSON.parse(s) : s;
      } catch {
        return null;
      }
    }).filter(Boolean);

    return res.status(200).json(submissions);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Eroare la citire" });
  }
}
