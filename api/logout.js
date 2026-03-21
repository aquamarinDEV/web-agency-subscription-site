import { kv } from "@vercel/kv";

function getCookie(req, name) {
  const c = req.headers?.cookie || "";
  const m = c.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}

export default async function handler(req, res) {
  const token = getCookie(req, "admin_session");
  if (token) {
    await kv.del(`session:${token}`);
  }

  res.setHeader(
    "Set-Cookie",
    "admin_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0"
  );
  return res.status(200).json({ ok: true });
}
