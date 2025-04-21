// pages/api/users.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { gender, city, country, page = '1', limit = '10', fields } = req.query;

    const pageNumber = parseInt(page as string) || 1;
    const pageSize = parseInt(limit as string) || 10;

    // Build filters
    const where: any = {};

    if (gender) where.gender = gender;
    if (city || country) {
      where.location = {};
      if (city) where.location.city = city;
      if (country) where.location.country = country;
    }

    // Build field selection
    const selectedFields = (fields as string)?.split(',') ?? [];
    const select: any = selectedFields.length
      ? Object.fromEntries(selectedFields.map((f) => [f, true]))
      : undefined;

    // Fetch data
    const users = await prisma.user.findMany({
      where,
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      select: {
        ...(select || { id: true, name: true, email: true, gender: true, createdAt: true }),
        location: {
          select: {
            city: true,
            country: true,
          },
        },
      },
    });

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}
