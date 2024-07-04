'use client';
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setPage } from '@/store/users';

interface PaginationProps {
  page: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages }) => {
  const dispatch = useDispatch<AppDispatch>();
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

  const handleNextPage = () => {
    if (page < totalPages) {
      dispatch(setPage(page + 1));
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };

  return (
    <div
      style={{
        textAlign: isMobile ? 'center' : 'right',
        marginTop: '20px',
      }}
    >
      <Button onClick={handlePrevPage} disabled={page === 1} icon={<LeftOutlined />} />
      <span style={{ margin: '0 10px' }}>Page {page} of {totalPages}</span>
      <Button onClick={handleNextPage} disabled={page === totalPages} icon={<RightOutlined />} />
    </div>
  );
};

export default Pagination;
