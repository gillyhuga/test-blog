import axios from 'axios';
import { User } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchUsersApi = async (page: number, perPage: number): Promise<{ users: User[], total: number }> => {
    const response = await axios.get<User[]>(`${API_URL}/users`, {
        params: {
            page,
            per_page: perPage,
        },
    });

    const total = parseInt(response.headers['x-pagination-total'], 10);
    return { users: response.data, total };
};

export const fetchUserByIdApi = async (id: number): Promise<User> => {
    const response = await axios.get<User>(`${API_URL}/users/${id}`);
    return response.data;
};
