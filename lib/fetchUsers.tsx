// lib/fetchUsers.ts
import axios from 'axios';
import { prisma } from './db';

export const fetchAndSaveUsers = async () => {
  try {
    const response = await axios.get('https://randomuser.me/api/?results=5');
    const users = response.data.results;

    for (const user of users) {
      // Save user and related location
      await prisma.user.create({
        data: {
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          gender: user.gender,
          location: {
            create: {
              city: user.location.city,
              country: user.location.country,
            },
          },
        },
      });
    }

    console.log('Users fetched and saved successfully.');
  } catch (error) {
    console.error('Error fetching or saving users:', error);
  }
};
