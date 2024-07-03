export interface Post {
    id: number;
    user_id: number;
    title: string;
    body: string;
  }
  
  export interface Comment {
    id: number;
    post_id: number;
    name: string;
    email: string;
    body: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
  }
  
  export interface PostsState {
    postsByPage: { [key: number]: Post[] };
    postDetails: { [key: number]: Post | null };
    commentsByPost: { [key: number]: Comment[] };
    page: number;
    totalPages: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }