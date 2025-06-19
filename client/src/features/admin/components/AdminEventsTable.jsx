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
import AdminEventRow from "./AdminEventRow";
import AdminBulkActionsAlert from "./AdminBulkActionsAlert";
import AdminFilterControls from "./AdminFilterControls";
import useTheme from "../../../shared/hooks/useTheme";
const AdminEventsTable = ({
  events,
  filteredEvents,
  selectedEvents,
  filters,
  onFilterChange,
  onEventSelection,
  onSelectAllEvents,
  onViewEvent,
  onDeleteEvent,
  onBulkAction,
}) => {
  const { adminTheme, getThemeColor } = useTheme();
  return (
    <Box sx={{ p: 3 }}>
      <AdminBulkActionsAlert
        selectedCount={selectedEvents.size}
        onBulkAction={(action) =>
          onBulkAction(
            action,
            Array.from(selectedEvents).map((id) => ({ id }))
          )
        }
        onClear={() => onEventSelection(null, true)}
        type="events"
      />
      <AdminFilterControls
        filters={filters}
        onFilterChange={onFilterChange}
        type="events"
      />
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: adminTheme.admin.text.secondary,
        }}
      >
        Showing {filteredEvents.length} of {events.length} events
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
                    selectedEvents.size > 0 &&
                    selectedEvents.size < filteredEvents.length
                  }
                  checked={
                    filteredEvents.length > 0 &&
                    selectedEvents.size === filteredEvents.length
                  }
                  onChange={onSelectAllEvents}
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
                Event
              </TableCell>
              <TableCell
                sx={{
                  color: adminTheme.admin.text.primary,
                  fontWeight: 600,
                }}
              >
                Creator
              </TableCell>
              <TableCell
                sx={{
                  color: adminTheme.admin.text.primary,
                  fontWeight: 600,
                }}
              >
                Location
              </TableCell>
              <TableCell
                sx={{
                  color: adminTheme.admin.text.primary,
                  fontWeight: 600,
                }}
              >
                Date
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
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEvents.map((eventItem) => (
              <AdminEventRow
                key={eventItem._id}
                eventItem={eventItem}
                isSelected={selectedEvents.has(eventItem._id)}
                onEventSelection={onEventSelection}
                onViewEvent={onViewEvent}
                onDeleteEvent={onDeleteEvent}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default AdminEventsTable;