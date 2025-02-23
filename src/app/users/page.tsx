'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchUsers, setSearchText, deleteUser } from '@/store/users';
import UserTable from '@/components/UserTable';
import { message } from 'antd';

const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { usersByPage, totalPages, page, perPage, status, searchText } = useSelector((state: RootState) => state.users);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  useEffect(() => {
    if (!usersByPage[page]) {
      dispatch(fetchUsers({ page, perPage }));
    }
  }, [dispatch, page, perPage, usersByPage]);

  const handleViewDetails = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUserId(null);
  };

  const handleCreateModalOpen = () => {
    setIsCreateModalVisible(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalVisible(false);
  };

  const handleUpdateModalOpen = (user: any) => {
    setSelectedUser(user);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalVisible(false);
    setSelectedUser(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value));
  };

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId)).then(() => {
      dispatch(fetchUsers({ page, perPage }));
    });
    message.success('User deleted successfully!');
  };

  const filteredUsers = usersByPage[page]?.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  ) || [];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <UserTable
        users={filteredUsers}
        status={status}
        searchText={searchText}
        page={page}
        totalPages={totalPages}
        onViewDetails={handleViewDetails}
        onCreateModalOpen={handleCreateModalOpen}
        onSearchChange={handleSearchChange}
        onDeleteUser={handleDeleteUser}
        onUpdateUser={handleUpdateModalOpen}
        selectedUserId={selectedUserId}
        isModalVisible={isModalVisible}
        onModalClose={handleModalClose}
        isCreateModalVisible={isCreateModalVisible}
        onCreateModalClose={handleCreateModalClose}
        isUpdateModalVisible={isUpdateModalVisible}
        onUpdateModalClose={handleUpdateModalClose}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default UsersPage;
