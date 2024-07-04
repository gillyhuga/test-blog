'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchUsers, setPage, setSearchText } from '@/store/users';
import UserTable from '@/components/UserTable';

const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { usersByPage, totalPages, page, perPage, status, searchText } = useSelector((state: RootState) => state.users);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  useEffect(() => {
    if (!usersByPage[page]) {
      dispatch(fetchUsers({ page, perPage }));
    }
  }, [dispatch, page, perPage, usersByPage]);

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

  const handleCreateModalOpen = () => {
    setIsCreateModalVisible(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalVisible(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value));
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
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        selectedUserId={selectedUserId}
        isModalVisible={isModalVisible}
        onModalClose={handleModalClose}
        isCreateModalVisible={isCreateModalVisible}
        onCreateModalClose={handleCreateModalClose}
      />
    </div>
  );
};

export default UsersPage;
