'use client';
import React from 'react';
import { Spin } from 'antd';

const Loader: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
      <Spin size="large" />
    </div>
  );
};

export default Loader;
