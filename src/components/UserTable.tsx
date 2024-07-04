'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tag, Button, Input } from 'antd';
import { fetchUsers, setPage, setSearchText } from '@/store/users';
import { RootState, AppDispatch } from '@/store';
import Pagination from './Pagination';
import Loader from './Loader';
import UserDetailModal from './UserDetailModal';
import { ManOutlined, WomanOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';

const UserTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { filteredUsers, totalPages, page, perPage, status, error, searchText } = useSelector((state: RootState) => state.users);

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchUsers({ page, perPage }));
    }, [dispatch, page, perPage]);

    const handleNextPage = () => {
        if (page < totalPages) {
            dispatch(setPage(page + 1));
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            dispatch(setPage(page - 1));
        }
    };

    const handleViewDetails = (userId: number) => {
        setSelectedUserId(userId);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedUserId(null);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchText(e.target.value));
    };

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
                <Button icon={<EyeOutlined />} onClick={() => handleViewDetails(record.id)} />
            ),
        },
    ];

    if (status === 'loading' && !filteredUsers.length) {
        return <Loader />;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <Input
                    placeholder="Search users"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={handleSearchChange}
                    style={{ width: '300px' }}
                />
            </div>
            <Table
                dataSource={filteredUsers}
                columns={columns}
                rowKey="id"
                pagination={false}
                scroll={{ x: 800 }}
            />
            <Pagination
                page={page}
                totalPages={totalPages}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
            />
            <UserDetailModal userId={selectedUserId} visible={isModalVisible} onClose={handleModalClose} />
        </>
    );
};

export default UserTable;
