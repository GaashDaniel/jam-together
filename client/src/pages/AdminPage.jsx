import React from "react";
import { Container } from "@mui/material";
import useTheme from "../shared/hooks/useTheme";
import LoadingSpinner from "../shared/components/ui/LoadingSpinner";
import AdminAccessGuard from "../features/admin/components/AdminAccessGuard";
import AdminHeader from "../features/admin/components/AdminHeader";
import AdminStatsOverview from "../features/admin/components/AdminStatsOverview";
import AdminTabsPanel from "../features/admin/components/AdminTabsPanel";
import AdminUsersTable from "../features/admin/components/AdminUsersTable";
import AdminEventsTable from "../features/admin/components/AdminEventsTable";
import AdminActionDialogs from "../features/admin/components/AdminActionDialogs";
import { useAdminPage } from "../features/admin/components/hooks";
export default function AdminPage() {
  const { adminTheme } = useTheme();
  const adminPageState = useAdminPage();
  const {
    loading,
    stats,
    users,
    events,
    filteredUsers,
    filteredEvents,
    tabValue,
    selectedUsers,
    selectedEvents,
    actionDialog,
    bulkDialog,
    actionLoading,
    user,
    handleTabChange,
    filters,
    handleFilterChange,
    handleUserSelection,
    handleEventSelection,
    handleSelectAllUsers,
    handleSelectAllEvents,
    onViewProfile,
    onViewEvent,
    onPromoteUser,
    onDemoteUser,
    onDeleteUser,
    onDeleteEvent,
    onBulkAction,
    closeActionDialog,
    closeBulkDialog,
    handleConfirmAction,
    handleConfirmBulkAction,
  } = adminPageState;
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <AdminAccessGuard>
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          backgroundColor: adminTheme.admin.background.main,
          minHeight: "100vh",
        }}
      >
        <AdminHeader />
        <AdminStatsOverview stats={stats} />
        <AdminTabsPanel
          tabValue={tabValue}
          onTabChange={handleTabChange}
          filteredUsersCount={filteredUsers.length}
          filteredEventsCount={filteredEvents.length}
          selectedUsersCount={selectedUsers.size}
          selectedEventsCount={selectedEvents.size}
        />
        {tabValue === 0 && (
          <AdminUsersTable
            users={users}
            filteredUsers={filteredUsers}
            selectedUsers={selectedUsers}
            filters={filters}
            onFilterChange={handleFilterChange}
            onUserSelection={handleUserSelection}
            onSelectAllUsers={handleSelectAllUsers}
            onViewProfile={onViewProfile}
            onPromoteUser={onPromoteUser}
            onDemoteUser={onDemoteUser}
            onDeleteUser={onDeleteUser}
            onBulkAction={onBulkAction}
            currentUserId={user._id}
          />
        )}
        {tabValue === 1 && (
          <AdminEventsTable
            events={events}
            filteredEvents={filteredEvents}
            selectedEvents={selectedEvents}
            filters={filters}
            onFilterChange={handleFilterChange}
            onEventSelection={handleEventSelection}
            onSelectAllEvents={handleSelectAllEvents}
            onViewEvent={onViewEvent}
            onDeleteEvent={onDeleteEvent}
            onBulkAction={onBulkAction}
          />
        )}
        <AdminActionDialogs
          actionDialog={actionDialog}
          bulkDialog={bulkDialog}
          actionLoading={actionLoading}
          onCloseActionDialog={closeActionDialog}
          onCloseBulkDialog={closeBulkDialog}
          onConfirmAction={handleConfirmAction}
          onConfirmBulkAction={handleConfirmBulkAction}
        />
      </Container>
    </AdminAccessGuard>
  );
}