
import { PrismaClient } from '@prisma/client';
import { getUserIdFromCookies } from '../../../lib/auth';

const prisma = new PrismaClient();

const fibonacciPuanlari = [0, 1, 2, 3, 5, 7, 13, 21, 34, 55, 89, 144];

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const userId = getUserIdFromCookies(req);

  if (!userId) {
    return res.status(401).json({ message: 'Yetkilendirilmemiş.' });
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!task || task.userId !== userId) {
      return res.status(404).json({ message: 'Görev bulunamadı.' });
    }

    switch (method) {
      case 'PUT':
        const { title, status, puan } = req.body;

        if (!title && !status && puan === undefined) {
          return res.status(400).json({ message: 'Başlık, durum veya puan gereklidir.' });
        }

        const updatedData = {};
        if (title) updatedData.title = title;
        if (status) updatedData.status = status;
        if (puan !== undefined) {
          if (!fibonacciPuanlari.includes(puan)) {
            return res.status(400).json({ message: 'Geçersiz puan değeri.' });
          }
          updatedData.puan = puan;
        }

        const updatedTask = await prisma.task.update({
          where: { id: parseInt(id, 10) },
          data: updatedData,
        });

        return res.status(200).json(updatedTask);

      case 'DELETE':
        await prisma.task.delete({
          where: { id: parseInt(id, 10) },
        });

        return res.status(200).json({ message: 'Görev silindi.' });

      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Task [id] API hatası:', error);
    return res.status(500).json({ message: 'Görev güncellenemedi veya silinemedi.' });
  }
}
