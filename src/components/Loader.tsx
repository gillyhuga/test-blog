'use client';
import React from 'react';
import { Spin } from 'antd';

const Loader: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Spin size="large" />
    </div>
  );
};

export default Loader;
