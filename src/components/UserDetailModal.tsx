'use client';
import React, { useEffect } from 'react';
import { Modal, Card, Row, Col, Avatar, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '@/store/users';
import { RootState, AppDispatch } from '@/store';
import { UserOutlined, CheckCircleOutlined, CloseCircleOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';
import Loader from './Loader';

interface UserDetailModalProps {
    userId: number | null;
    visible: boolean;
    onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ userId, visible, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const userDetail = useSelector((state: RootState) => userId ? state.users.userDetails[userId] : null);
    const status = useSelector((state: RootState) => state.users.status);

    useEffect(() => {
        if (userId && !userDetail) {
            dispatch(fetchUserById(userId));
        }
    }, [dispatch, userId, userDetail]);

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <Modal open={visible} onCancel={onClose} footer={null} centered>
            {status === 'loading' ? (
                <Loader />
            ) : userDetail ? (
                <Card title="User Details" bordered={false}>
                    <Row justify="center" align="middle">
                        <Col span={24} style={{ textAlign: 'center', marginBottom: '10px' }}>
                            <Avatar size={80} icon={<UserOutlined />} />
                        </Col>
                        <Col span={24}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <p style={{ margin: 0 }}><strong>ID:</strong> {userDetail.id}</p>
                                <p style={{ margin: 0 }}><strong>Name:</strong> {userDetail.name}</p>
                                <p style={{ margin: 0 }}><strong>Email:</strong> {userDetail.email}</p>
                                <p style={{ margin: 0 }}><strong>Gender:</strong>
                                    <Tag color={userDetail.gender === 'male' ? 'blue' : 'pink'} style={{ marginLeft: '8px' }} icon={userDetail.gender === 'male' ? <ManOutlined /> : <WomanOutlined />}>
                                        {capitalizeFirstLetter(userDetail.gender)}
                                    </Tag>
                                </p>
                                <p style={{ margin: 0 }}><strong>Status:</strong>
                                    <Tag color={userDetail.status === 'active' ? 'green' : 'red'} style={{ marginLeft: '8px' }}>
                                        {userDetail.status === 'active' ? <CheckCircleOutlined /> : <CloseCircleOutlined />} {capitalizeFirstLetter(userDetail.status)}
                                    </Tag>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Card>
            ) : (
                <p>No user details available</p>
            )}
        </Modal>
    );
};

export default UserDetailModal;
