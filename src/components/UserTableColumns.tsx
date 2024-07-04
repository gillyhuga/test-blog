import React from 'react';
import { Tag, Button, Popconfirm } from 'antd';
import { 
    ManOutlined, 
    WomanOutlined, 
    EyeOutlined, 
    EditOutlined, 
    DeleteOutlined 
} from '@ant-design/icons';

const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export const getColumns = (
    onViewDetails: (userId: number) => void,
    onUpdateUser: (user: any) => void,
    onDeleteUser: (userId: number) => void
) => [
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
                <Button
                    icon={<EditOutlined style={{ color: '#faad14' }} />}
                    style={{ marginLeft: 8 }}
                    onClick={() => onUpdateUser(record)}
                />
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
