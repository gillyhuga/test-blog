'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { RootState, AppDispatch } from '@/store';
import { fetchPostById, fetchCommentsByPostId } from '@/store/posts';
import PostDetail from '@/components/PostDetail';
import CommentsList from '@/components/CommentsList';
import Loader from '@/components/Loader';

const PostPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { postDetails, commentsByPost, status, error } = useSelector((state: RootState) => state.posts);
  const post = postDetails[Number(id)];
  const comments = commentsByPost[Number(id)];

  useEffect(() => {
    if (id && !post) {
      dispatch(fetchPostById(Number(id)));
    }
    if (id && !comments) {
      dispatch(fetchCommentsByPostId(Number(id)));
    }
  }, [dispatch, id, post, comments]);

  if (status === 'loading' && !post) {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {post && <PostDetail post={post} />}
      {comments && <CommentsList comments={comments} />}
    </div>
  );
};

export default PostPage;
