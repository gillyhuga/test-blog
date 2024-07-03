'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchPosts, setPage } from '@/store/posts';
import PostList from '@/components/PostList';
import Loader from '@/components/Loader';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { postsByPage, page, totalPages, status, error } = useSelector((state: RootState) => state.posts);
  const perPage = 12;

  useEffect(() => {
    if (!postsByPage[page]) {
      dispatch(fetchPosts({ page, perPage }));
    }
  }, [dispatch, page, perPage, postsByPage]);

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

  if (status === 'loading' && !postsByPage[page]) {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  const posts = postsByPage[page] || [];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <PostList
        posts={posts}
        page={page}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  );
};

export default Home;
