// pages/index.tsx

import { prisma } from '@/lib/db';

// Define types for Location and User
interface Location {
  city: string;
  country: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
  createdAt: string;
  location: Location | null; // location can be null if not present
}

export async function getServerSideProps() {
  const users = await prisma.user.findMany({
    include: {
      location: true,
    },
  });

  const serializedUsers = users.map((user) => ({
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString('en-US'), // Format date on the server
    location: user.location ? { ...user.location } : null, // Ensure location is safely accessed
  }));

  return {
    props: { users: serializedUsers },
  };
}

export default function HomePage({ users }: { users: User[] }) {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 fw-bold text-dark">User List</h1>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Gender</th>
              <th className="text-center">Created At</th>
              <th className="text-center">Location</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="align-middle">
                <td className="text-center">{user.name}</td>
                <td className="text-center">{user.email}</td>
                <td className="text-center">{user.gender}</td>
                <td className="text-center">{user.createdAt}</td>
                <td className="text-center">
                  {user.location?.city}, {user.location?.country}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
