// import "@/styles/globals.css";
// import type { AppProps } from "next/app";
// import { useEffect } from 'react';
// import { startCronJob } from '@/lib/cron';

// export default function App({ Component, pageProps }: AppProps) {
//    useEffect(() => {
//     startCronJob(); // Start the cron job
//   }, []);

//   return <Component {...pageProps} />;
// }
// pages/_app.tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Ensure cron job runs on the server side only
    if (typeof window === 'undefined') {
      import('@/lib/cron').then((module) => {
        module.startCronJob();
      });
    }
  }, []);

  return <Component {...pageProps} />;
}
