'use client';
import React from 'react';
import { Table, Tag, Button, Input, Popconfirm } from 'antd';
import { ManOutlined, WomanOutlined, EyeOutlined, SearchOutlined, UserAddOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import UserDetailModal from './UserDetailModal';
import CreateUserModal from './UserCreateModal';
import UpdateUserModal from './UserUpdateModal';
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
    onNextPage: () => void;
    onPrevPage: () => void;
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
    onNextPage,
    onPrevPage,
    onDeleteUser,
    onUpdateUser,
    selectedUserId,
    isModalVisible,
    onModalClose,
    isCreateModalVisible,
    onCreateModalClose,
    isUpdateModalVisible,
    onUpdateModalClose,
    selectedUser
}) => {
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender: string) => (
                <Tag color={gender === 'male' ? 'blue' : 'pink'} icon={gender === 'male' ? <ManOutlined /> : <WomanOutlined />}>
                    {capitalizeFirstLetter(gender)}
                </Tag>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>
                    {capitalizeFirstLetter(status)}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: any) => (
                <>
                    <Button icon={<EyeOutlined />} onClick={() => onViewDetails(record.id)} />
                    <Button icon={<EditOutlined style={{ color: '#faad14' }} />} style={{ marginLeft: 8 }} onClick={() => onUpdateUser(record)} />
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => onDeleteUser(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />} style={{ marginLeft: 8 }} />
                    </Popconfirm>
                </>
            ),
        },
    ];

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
                onNextPage={onNextPage}
                onPrevPage={onPrevPage}
            />
            <UserDetailModal userId={selectedUserId} visible={isModalVisible} onClose={onModalClose} />
            <CreateUserModal visible={isCreateModalVisible} onClose={onCreateModalClose} />
            <UpdateUserModal visible={isUpdateModalVisible} onClose={onUpdateModalClose} user={selectedUser} />
        </>
    );
};

export default UserTable;
