import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
} from "@mui/material";
import AdminUserRow from "./AdminUserRow";
import AdminBulkActionsAlert from "./AdminBulkActionsAlert";
import AdminFilterControls from "./AdminFilterControls";
import useTheme from "../../../shared/hooks/useTheme";
const AdminUsersTable = ({
  users,
  filteredUsers,
  selectedUsers,
  filters,
  onFilterChange,
  onUserSelection,
  onSelectAllUsers,
  onViewProfile,
  onPromoteUser,
  onDemoteUser,
  onDeleteUser,
  onBulkAction,
  currentUserId,
}) => {
  const { adminTheme, mode, getThemeColor } = useTheme();
  return (
    <Box sx={{ p: 3 }}>
      <AdminBulkActionsAlert
        selectedCount={selectedUsers.size}
        onBulkAction={(action) =>
          onBulkAction(
            action,
            Array.from(selectedUsers).map((id) => ({ id }))
          )
        }
        onClear={() => onUserSelection(null, true)}
        type="users"
      />
      <AdminFilterControls
        filters={filters}
        onFilterChange={onFilterChange}
        type="users"
      />
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: adminTheme.admin.text.secondary,
        }}
      >
        Showing {filteredUsers.length} of {users.length} users
      </Typography>
      <TableContainer
        component={Paper}
        elevation={adminTheme.admin.elevation.card}
        sx={{
          backgroundColor: adminTheme.admin.background.paper,
          border: `1px solid ${getThemeColor("#e9ecef", "#404040")}`,
        }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: getThemeColor("#f8f9fa", "#1a1a1a"),
            }}
          >
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedUsers.size > 0 &&
                    selectedUsers.size < filteredUsers.length
                  }
                  checked={
                    filteredUsers.length > 0 &&
                    selectedUsers.size === filteredUsers.length
                  }
                  onChange={onSelectAllUsers}
                  sx={{
                    color: adminTheme.admin.primary,
                    "&.Mui-checked": {
                      color: adminTheme.admin.primary,
                    },
                  }}
                />
              </TableCell>
              <TableCell
                sx={{
                  color: adminTheme.admin.text.primary,
                  fontWeight: 600,
                }}
              >
                User
              </TableCell>
              <TableCell
                sx={{
                  color: adminTheme.admin.text.primary,
                  fontWeight: 600,
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  color: adminTheme.admin.text.primary,
                  fontWeight: 600,
                }}
              >
                Role
              </TableCell>
              <TableCell
                sx={{
                  color: adminTheme.admin.text.primary,
                  fontWeight: 600,
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  color: adminTheme.admin.text.primary,
                  fontWeight: 600,
                }}
              >
                Joined
              </TableCell>
              <TableCell
                sx={{
                  color: adminTheme.admin.text.primary,
                  fontWeight: 600,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((userItem) => (
              <AdminUserRow
                key={userItem._id}
                userItem={userItem}
                isSelected={selectedUsers.has(userItem._id)}
                currentUserId={currentUserId}
                onUserSelection={onUserSelection}
                onViewProfile={onViewProfile}
                onPromoteUser={onPromoteUser}
                onDemoteUser={onDemoteUser}
                onDeleteUser={onDeleteUser}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default AdminUsersTable;