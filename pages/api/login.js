import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as Sentry from "@sentry/nextjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Kullanıcı adı ve şifre gereklidir." });
  }

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      // Kullanıcı bulunamadı
      Sentry.captureMessage(
        `Başarısız giriş denemesi: Kullanıcı bulunamadı - ${username}`,
        "warning"
      );
      return res.status(401).json({ message: "Kullanıcı bulunamadı." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      Sentry.captureMessage(
        `Başarısız giriş denemesi: Yanlış şifre - ${username}`,
        "warning"
      );
      return res.status(401).json({ message: "Şifre yanlış." });
    }

    res.setHeader(
      "Set-Cookie",
      `userId=${user.id}; Max-Age=3600; Path=/; HttpOnly; Secure; SameSite=Strict`
    );
    res.status(200).json({ message: "Başarıyla giriş yapıldı." });
  } catch (error) {
    // Beklenmeyen bir hata
    Sentry.captureException(error);
    console.error("Login API hatası:", error);
    res.status(500).json({ message: "Giriş yapılamadı." });
  }
}
