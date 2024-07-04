'use client';
import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { updateUser } from '@/store/users';
import { AppDispatch } from '@/store';

const { Option } = Select;

interface UpdateUserModalProps {
    visible: boolean;
    onClose: () => void;
    user: any | null;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({ visible, onClose, user }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [form] = Form.useForm();

    useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
        }
    }, [user, form]);

    const handleUpdateUser = async () => {
        try {
            const values = await form.validateFields();
            await dispatch(updateUser({ userId: user.id, userData: values })).unwrap();
            onClose();
            message.success('User updated successfully!');
        } catch (error: any) {
            if (error && error.message) {
                console.error('Validation failed:', error.message);
            } else {
                console.error('Failed to update user:', error);
            }
        }
    };

    return (
        <Modal
            title="Update User"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleUpdateUser}>
                    Update
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please enter the email' },
                        { type: 'email', message: 'Please enter a valid email' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please select the gender' }]}>
                    <Select>
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status' }]}>
                    <Select>
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateUserModal;
