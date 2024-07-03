'use client';
import React from 'react';
import { List } from 'antd';
import { Post } from '@/types';
import PostCard from './PostCard';
import Pagination from './Pagination';

interface PostListProps {
  posts: Post[];
  page: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const PostList: React.FC<PostListProps> = ({ posts, page, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        dataSource={posts}
        renderItem={(post: Post) => (
          <List.Item>
            <PostCard post={post} />
          </List.Item>
        )}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
    </div>
  );
};

export default PostList;
