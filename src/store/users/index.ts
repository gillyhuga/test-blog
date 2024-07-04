import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';
import { fetchUsersApi, fetchUserByIdApi, createUserApi } from '@/api/users';

interface UsersState {
  usersByPage: { [key: number]: User[] };
  userDetails: { [key: number]: User | null };
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchText: string;
}

const initialState: UsersState = {
  usersByPage: {},
  userDetails: {},
  total: 0,
  page: 1,
  perPage: 10,
  totalPages: 1,
  status: 'idle',
  error: null,
  searchText: '',
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page, perPage }: { page: number; perPage: number }) => {
    return await fetchUsersApi(page, perPage);
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id: number) => {
    return await fetchUserByIdApi(id);
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: User) => {
    return await createUserApi(userData);
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usersByPage[state.page] = action.payload.users;
        state.total = action.payload.total;
        state.totalPages = Math.ceil(action.payload.total / state.perPage);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userDetails[action.meta.arg] = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userDetails[action.payload.id] = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { setPage, setPerPage, setSearchText } = usersSlice.actions;

export default usersSlice.reducer;
