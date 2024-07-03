'use client';
import React from 'react';
import { Button } from 'antd';

interface PaginationProps {
  page: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Button onClick={onPrevPage} disabled={page === 1}>
        Previous
      </Button>
      <span style={{ margin: '0 10px' }}>Page {page} of {totalPages}</span>
      <Button onClick={onNextPage} disabled={page === totalPages}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
