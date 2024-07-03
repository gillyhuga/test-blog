'use client';
import React from 'react';
import { Card } from 'antd';
import { Post } from '@/types';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link href={`/${post.id}`} passHref>
      <Card
        hoverable
        cover={
          <div
            style={{
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f0f0f0',
              fontSize: '4em',
              color: '#1890ff',
            }}
          >
            {post.title.charAt(0)}
          </div>
        }
        style={{
          borderRadius: '8px',
          overflow: 'hidden',
          transition: 'transform 0.3s',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
        bodyStyle={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: '1' }}
      >
        <Card.Meta
          title={<span style={{ fontSize: '1em', color: '#1890ff' }}>{post.title}</span>}
          description={
            <div
              style={{
                fontSize: '1em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                height: '100%',
                textAlign: 'justify',
              }}
            >
              {post.body}
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default PostCard;
