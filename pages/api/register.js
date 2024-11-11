import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

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
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res
      .status(201)
      .json({ message: "Kullanıcı başarıyla oluşturuldu.", userId: user.id });
  } catch (error) {
    console.error("Register API hatası:", error);
    res.status(500).json({ message: "Kullanıcı oluşturulamadı." });
  }
}
