'use client';
import React from 'react';
import UserTable from '@/components/UserTable';

const UsersPage: React.FC = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <UserTable />
    </div>
  );
};

export default UsersPage;
