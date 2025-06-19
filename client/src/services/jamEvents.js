import api from './api';
export const jamEventsService = {
    getEvents: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return api.get(`/jamEvents${queryString ? `?${queryString}` : ''}`);
    },
    getEventById: (id) => api.get(`/jamEvents/${id}`),
    createEvent: (eventData) => api.post('/jamEvents', eventData),
    updateEvent: (id, eventData) => api.patch(`/jamEvents/${id}`, eventData),
    deleteEvent: (id) => api.delete(`/jamEvents/${id}`),
    createJoinRequest: (eventId, requestData) =>
        api.post(`/jamEvents/${eventId}/join`, requestData),
    handleJoinRequest: (eventId, requestId, action) =>
        api.patch(`/jamEvents/${eventId}/approveJoin/${requestId}`, { action }),
    toggleLike: (eventId) => api.post(`/jamEvents/${eventId}/like`),
};
export const usersService = {
    getUsers: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return api.get(`/users${queryString ? `?${queryString}` : ''}`);
    },
    getUserById: (id) => api.get(`/users/${id}`),
    updateUserRole: (id, role) => api.patch(`/users/${id}/role`, { role }),
    deleteUser: (id) => api.delete(`/users/${id}`),
    getUserStats: () => api.get('/users/stats'),
};