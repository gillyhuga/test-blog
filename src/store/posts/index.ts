import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchPostsApi, fetchPostByIdApi, fetchCommentsByPostIdApi } from '@/api/posts';
import { PostsState } from '@/types';


const initialState: PostsState = {
  postsByPage: {},
  postDetails: {},
  commentsByPost: {},
  page: 1,
  totalPages: 1,
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ page, perPage }: { page: number; perPage: number }) => {
    return await fetchPostsApi(page, perPage);
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id: number) => {
    return await fetchPostByIdApi(id);
  }
);

export const fetchCommentsByPostId = createAsyncThunk(
  'posts/fetchCommentsByPostId',
  async (postId: number) => {
    return await fetchCommentsByPostIdApi(postId);
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.postsByPage[action.payload.page] = action.payload.posts;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.postDetails[action.payload.id] = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.commentsByPost[action.payload.postId] = action.payload.comments;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { setPage } = postsSlice.actions;

export default postsSlice.reducer;
