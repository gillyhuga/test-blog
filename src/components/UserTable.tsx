'use client';
import React from 'react';
import { Table, Tag, Button, Input } from 'antd';
import { ManOutlined, WomanOutlined, EyeOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import UserDetailModal from './UserDetailModal';
import CreateUserModal from './UserCreateModal';
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
    selectedUserId: number | null;
    isModalVisible: boolean;
    onModalClose: () => void;
    isCreateModalVisible: boolean;
    onCreateModalClose: () => void;
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
    selectedUserId,
    isModalVisible,
    onModalClose,
    isCreateModalVisible,
    onCreateModalClose
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
            render: (text: any, record: any) => (
                <Button icon={<EyeOutlined />} onClick={() => onViewDetails(record.id)} />
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
        </>
    );
};

export default UserTable;
