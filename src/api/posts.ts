import axios from 'axios';
import { Post, Comment } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchPostsApi = async (page: number, perPage: number) => {
  const response = await axios.get<Post[]>(`${API_URL}/posts`, {
    params: {
      page,
      per_page: perPage,
    },
  });
  const totalPages = parseInt(response.headers['x-pagination-pages'], 10);
  return { page, posts: response.data, totalPages };
};

export const fetchPostByIdApi = async (id: number) => {
  const response = await axios.get<Post>(`${API_URL}/posts/${id}`);
  return response.data;
};

export const fetchCommentsByPostIdApi = async (postId: number) => {
  const response = await axios.get<Comment[]>(`${API_URL}/posts/${postId}/comments`);
  return { postId, comments: response.data };
};
