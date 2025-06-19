import { useState, useEffect } from 'react';
export const useMyEventsFilters = (events) => {
    const [filters, setFilters] = useState({ search: '', status: 'all', genres: [], dateFrom: '', dateTo: '' });
    const [filteredEvents, setFilteredEvents] = useState([]);
    useEffect(() => { setFilteredEvents(events.filter(event => filters.search ? event.title?.toLowerCase().includes(filters.search.toLowerCase()) : true)); }, [events, filters]);
    const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
    const handleClearFilters = () => setFilters({ search: filters.search, status: 'all', genres: [], dateFrom: '', dateTo: '' });
    return { filters, filteredEvents, handleFilterChange, handleClearFilters };
};