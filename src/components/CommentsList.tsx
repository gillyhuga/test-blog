'use client';
import React from 'react';
import { List, Avatar } from 'antd';
import { Comment } from '@/types';

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  return (
    <div>
      <h2>Comments</h2>
      <List
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(comment: Comment) => (
          <List.Item style={{ padding: '10px 20px', borderBottom: '1px solid #f0f0f0' }}>
            <List.Item.Meta
              avatar={<Avatar style={{ backgroundColor: '#87d068' }}>{comment.name.charAt(0)}</Avatar>}
              title={<span style={{ fontWeight: 'bold' }}>{comment.name}</span>}
              description={
                <div>
                  <p style={{ margin: 0 }}>{comment.body}</p>
                </div>
              }
            />
          </List.Item>
        )}
        style={{ borderRadius: '8px', overflow: 'hidden' }}
      />
    </div>
  );
};

export default CommentsList;
