export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  res.setHeader(
    "Set-Cookie",
    "userId=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict"
  );
  res.status(200).json({ message: "Başarıyla çıkış yapıldı." });
}
