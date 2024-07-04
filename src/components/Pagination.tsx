'use client';
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface PaginationProps {
  page: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onNextPage, onPrevPage }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        textAlign: isMobile ? 'center' : 'right',
        marginTop: '20px',
      }}
    >
      <Button onClick={onPrevPage} disabled={page === 1} icon={<LeftOutlined />} />
      <span style={{ margin: '0 10px' }}>Page {page} of {totalPages}</span>
      <Button onClick={onNextPage} disabled={page === totalPages} icon={<RightOutlined />} />
    </div>
  );
};

export default Pagination;
