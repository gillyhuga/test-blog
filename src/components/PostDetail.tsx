'use client';
import React from 'react';
import { Card } from 'antd';
import { Post } from '@/types';

interface PostDetailProps {
  post: Post;
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  return (
    <Card
      title={post.title}
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '20px',
      }}
    >
      <p>{post.body}</p>
    </Card>
  );
};

export default PostDetail;
