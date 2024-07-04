import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';
import { fetchUsersApi, fetchUserByIdApi, createUserApi, updateUserApi, deleteUserApi } from '@/api/users';

interface UsersState {
  usersByPage: { [key: number]: User[] };
  userDetails: { [key: number]: User | null };
  filteredUsers: User[];
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
  filteredUsers: [],
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

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, userData }: { userId: number; userData: Partial<User> }) => {
    return await updateUserApi(userId, userData);
  }
);


export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: number) => {
    await deleteUserApi(userId);
    return userId;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
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
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.userDetails[action.meta.arg] = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.userDetails[action.payload.id] = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const page = state.page;
        state.usersByPage[page] = state.usersByPage[page].map(user =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const page = state.page;
        state.usersByPage[page] = state.usersByPage[page].filter(user => user.id !== action.payload);
      });
  },
});

export const { setPage, setSearchText } = usersSlice.actions;

export default usersSlice.reducer;
