import { PrismaClient } from '@prisma/client';
import { getUserIdFromCookies } from '../../../lib/auth';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, puan, issueNumber } = req.body;
    const userId = getUserIdFromCookies(req);

    if (!userId) {
      return res.status(401).json({ message: 'Yetkilendirilmemiş.' });
    }

    if (!title) {
      return res.status(400).json({ message: 'Görev başlığı gereklidir.' });
    }

    try {
      if (issueNumber) {
        const existingTask = await prisma.task.findUnique({
          where: { issueNumber },
        });

        if (existingTask) {
          return res.status(400).json({ message: 'Bu issue numarası zaten mevcut.' });
        }
      }

      let nextIssueNumber;
      if (!issueNumber) {
        const lastTask = await prisma.task.findFirst({
          orderBy: {
            issueNumber: 'desc',
          },
        });

        const lastNumber = lastTask && lastTask.issueNumber
          ? parseInt(lastTask.issueNumber.split('-')[1], 10)
          : 0;

        nextIssueNumber = `ISSUE-${lastNumber + 1}`;
      }

      const newTask = await prisma.task.create({
        data: {
          title,
          status: 'To Do',
          puan: puan || 0,
          issueNumber: issueNumber || nextIssueNumber,
          user: { connect: { id: userId } },
        },
      });

      return res.status(201).json(newTask);
    } catch (error) {
      console.error('Görev ekleme hatası:', error);
      return res.status(500).json({ message: 'Görev eklenemedi.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
