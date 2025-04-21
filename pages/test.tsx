// pages/test.tsx

import { GetServerSideProps } from 'next';
import { fetchAndSaveUsers } from '@/lib/fetchUsers';

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await fetchAndSaveUsers();
    console.log('✅ Users successfully fetched and stored.');
  } catch (error) {
    console.error('❌ Error in getServerSideProps:', error);
  }

  return {
    props: {},
  };
};

const TestPage = () => (
  <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
    <h1>Test Page</h1>
    <p>Users have been fetched and saved to the database. ✅</p>
  </main>
);

export default TestPage;
