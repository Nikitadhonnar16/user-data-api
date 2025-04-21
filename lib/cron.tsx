// lib/cron.tsx
// import cron from 'node-cron';
// import { fetchAndSaveUsers } from './fetchUsers';

// export const startCronJob = () => {
//   cron.schedule('*/5 * * * *', async () => {
//     console.log('[CRON] Running scheduled user fetch...');
//     await fetchAndSaveUsers();
//   });
// };


// lib/cron.ts
// lib/cron.ts
import cron from 'node-cron';
import { fetchAndSaveUsers } from './fetchUsers';

// Function to start the cron job
export const startCronJob = () => {
  cron.schedule('*/5 * * * *', async () => {
    console.log('[CRON] Running scheduled user fetch...');
    await fetchAndSaveUsers();
  });
};

// Make sure this runs only on the server-side
if (typeof window === 'undefined') {
  startCronJob();
}


