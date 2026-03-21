import { kv } from "@vercel/kv";
import { randomBytes } from "crypto";

export const config = {
  api: { bodyParser: true },
};

const SESSION_TTL = 60 * 60 * 24;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;

  if (!user || !pass) {
    return res.status(500).json({ error: "Configurare admin incompleta" });
  }

  const { username, password } = req.body || {};

  if (username !== user || password !== pass) {
    return res.status(401).json({ error: "User sau parola incorecte" });
  }

  const token = randomBytes(32).toString("hex");
  await kv.set(`session:${token}`, "1", { ex: SESSION_TTL });

  res.setHeader(
    "Set-Cookie",
    `admin_session=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_TTL}`
  );
  return res.status(200).json({ ok: true });
}
