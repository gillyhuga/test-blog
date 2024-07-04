import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { createUser, fetchUsers } from '@/store/users';
import { AppDispatch, RootState } from '@/store';
import { useSelector } from 'react-redux';

const { Option } = Select;

interface Props {
    visible: boolean;
    onClose: () => void;
}

const CreateUserModal: React.FC<Props> = ({ visible, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { page, perPage } = useSelector((state: RootState) => state.users);
    const [form] = Form.useForm(); 
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

    const handleCreateUser = async () => {
        try {
            const values = await form.validateFields();
            await dispatch(createUser(values)).unwrap();
            onClose();
            message.success('User created successfully!');
            form.resetFields();
            dispatch(fetchUsers({ page, perPage }));
        } catch (error: any) {
            if (error && error.message) {
                console.error('Validation failed:', error.message);
            } else {
                console.error('Failed to create user:', error);
            }
        }
    };

    return (
        <Modal
            title="Create New User"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleCreateUser}>
                    Create
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleCreateUser}
                onValuesChange={() => {
                    setValidationErrors({});
                }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please enter the name' }]}
                    validateStatus={validationErrors.name ? 'error' : ''}
                    help={validationErrors.name}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please enter the email' },
                        { type: 'email', message: 'Please enter a valid email' },
                    ]}
                    validateStatus={validationErrors.email ? 'error' : ''}
                    help={validationErrors.email}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true, message: 'Please select the gender' }]}
                    validateStatus={validationErrors.gender ? 'error' : ''}
                    help={validationErrors.gender}
                >
                    <Select>
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Please select the status' }]}
                    validateStatus={validationErrors.status ? 'error' : ''}
                    help={validationErrors.status}
                >
                    <Select>
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateUserModal;
