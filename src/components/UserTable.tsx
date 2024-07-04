'use client';
import React from 'react';
import { Table, Button, Input } from 'antd';
import {
    SearchOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import UserDetailModal from './UserDetailModal';
import CreateUserModal from './UserCreateModal';
import UpdateUserModal from './UserUpdateModal';
import { getColumns } from './UserTableColumns';
import Pagination from './Pagination';

interface UserTableProps {
    users: any[];
    status: string;
    searchText: string;
    page: number;
    totalPages: number;
    onViewDetails: (userId: number) => void;
    onCreateModalOpen: () => void;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDeleteUser: (userId: number) => void;
    onUpdateUser: (user: any) => void;
    selectedUserId: number | null;
    isModalVisible: boolean;
    onModalClose: () => void;
    isCreateModalVisible: boolean;
    onCreateModalClose: () => void;
    isUpdateModalVisible: boolean;
    onUpdateModalClose: () => void;
    selectedUser: any | null;
}

const UserTable: React.FC<UserTableProps> = ({
    users,
    status,
    searchText,
    page,
    totalPages,
    onViewDetails,
    onCreateModalOpen,
    onSearchChange,
    onDeleteUser,
    onUpdateUser,
    selectedUserId,
    isModalVisible,
    onModalClose,
    isCreateModalVisible,
    onCreateModalClose,
    isUpdateModalVisible,
    onUpdateModalClose,
    selectedUser,
}) => {
    const columns = getColumns(onViewDetails, onUpdateUser, onDeleteUser);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Input
                    placeholder="Search users"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={onSearchChange}
                    style={{ width: '300px', marginRight: '10px' }}
                />
                <Button type="primary" onClick={onCreateModalOpen} icon={<UserAddOutlined />}>
                    Create User
                </Button>
            </div>
            <Table
                dataSource={users}
                columns={columns}
                rowKey="id"
                pagination={false}
                scroll={{ x: 800 }}
                loading={status === 'loading'}
            />
            <Pagination
                page={page}
                totalPages={totalPages}
            />
            <UserDetailModal userId={selectedUserId} visible={isModalVisible} onClose={onModalClose} />
            <CreateUserModal visible={isCreateModalVisible} onClose={onCreateModalClose} />
            <UpdateUserModal visible={isUpdateModalVisible} onClose={onUpdateModalClose} user={selectedUser} />
        </>
    );
};

export default UserTable;
