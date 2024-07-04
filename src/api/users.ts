import axios from 'axios';
import { User } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
export const fetchUsersApi = async (page: number, perPage: number): Promise<{
    page: any; users: User[], total: number
}> => {
    const response = await axios.get<User[]>(`${API_URL}/users`, {
        params: {
            page,
            per_page: perPage,
        },
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
    });

    const total = parseInt(response.headers['x-pagination-total'], 10);
    return { users: response.data, page, total };
};

export const fetchUserByIdApi = async (id: number): Promise<User> => {
    const response = await axios.get<User>(`${API_URL}/users/${id}`, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
    });
    return response.data;
};

export const createUserApi = async (userData: Partial<User>): Promise<User> => {
    if (!ACCESS_TOKEN) {
        throw new Error('Access token not available');
    }

    const response = await axios.post<User>(`${API_URL}/users`, userData, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
    });
    return response.data;
};

export const updateUserApi = async (userId: number, updatedUserData: Partial<User>): Promise<User> => {
    if (!ACCESS_TOKEN) {
        throw new Error('Access token not available');
    }

    const response = await axios.put<User>(`${API_URL}/users/${userId}`, updatedUserData, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
    });
    return response.data;
};

export const deleteUserApi = async (userId: number): Promise<void> => {
    if (!ACCESS_TOKEN) {
        throw new Error('Access token not available');
    }

    await axios.delete(`${API_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
    });
};
