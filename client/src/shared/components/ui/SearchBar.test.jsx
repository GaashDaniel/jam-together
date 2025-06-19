import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';
describe('SearchBar Component', () => {
    const mockOnSearch = jest.fn();
    const defaultProps = {
        onSearch: mockOnSearch,
        placeholder: 'Search...',
    };
    beforeEach(() => {
        mockOnSearch.mockClear();
    });
    it('renders with default props', () => {
        render(<SearchBar {...defaultProps} />);
        const input = screen.getByRole('textbox');
        const searchButton = screen.getByRole('button', { name: /search/i });
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('placeholder', 'Search...');
        expect(searchButton).toBeInTheDocument();
    });
    it('displays initial value when provided', () => {
        render(<SearchBar {...defaultProps} initialValue="test search" />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('test search');
    });
    it('calls onSearch when search button is clicked', async () => {
        const user = userEvent.setup();
        render(<SearchBar {...defaultProps} />);
        const input = screen.getByRole('textbox');
        const searchButton = screen.getByRole('button', { name: /search/i });
        await user.type(input, 'jazz music');
        await user.click(searchButton);
        expect(mockOnSearch).toHaveBeenCalledWith('jazz music');
    });
    it('calls onSearch when Enter key is pressed', async () => {
        const user = userEvent.setup();
        render(<SearchBar {...defaultProps} />);
        const input = screen.getByRole('textbox');
        await user.type(input, 'rock concert');
        await user.keyboard('{Enter}');
        expect(mockOnSearch).toHaveBeenCalledWith('rock concert');
    });
    it('shows clear button when there is text', async () => {
        const user = userEvent.setup();
        render(<SearchBar {...defaultProps} />);
        const input = screen.getByRole('textbox');
        expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
        await user.type(input, 'blues');
        const clearButton = screen.getByRole('button', { name: /clear/i });
        expect(clearButton).toBeInTheDocument();
    });
    it('clears input when clear button is clicked', async () => {
        const user = userEvent.setup();
        render(<SearchBar {...defaultProps} />);
        const input = screen.getByRole('textbox');
        await user.type(input, 'classical');
        const clearButton = screen.getByRole('button', { name: /clear/i });
        await user.click(clearButton);
        expect(input).toHaveValue('');
        expect(mockOnSearch).toHaveBeenCalledWith('');
    });
    it('handles empty search gracefully', async () => {
        const user = userEvent.setup();
        render(<SearchBar {...defaultProps} />);
        const searchButton = screen.getByRole('button', { name: /search/i });
        await user.click(searchButton);
        expect(mockOnSearch).toHaveBeenCalledWith('');
    });
    it('trims whitespace from search term', async () => {
        const user = userEvent.setup();
        render(<SearchBar {...defaultProps} />);
        const input = screen.getByRole('textbox');
        const searchButton = screen.getByRole('button', { name: /search/i });
        await user.type(input, '  folk music  ');
        await user.click(searchButton);
        expect(mockOnSearch).toHaveBeenCalledWith('folk music');
    });
    it('debounces search when debounceMs is provided', async () => {
        jest.useFakeTimers();
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        render(<SearchBar {...defaultProps} debounceMs={300} />);
        const input = screen.getByRole('textbox');
        await user.type(input, 'test');
        expect(mockOnSearch).not.toHaveBeenCalled();
        jest.advanceTimersByTime(300);
        await waitFor(() => {
            expect(mockOnSearch).toHaveBeenCalledWith('test');
        });
        jest.useRealTimers();
    });
    it('applies custom className', () => {
        render(<SearchBar {...defaultProps} className="custom-search" />);
        const container = screen.getByRole('textbox').closest('.MuiBox-root');
        expect(container).toHaveClass('custom-search');
    });
    it('applies custom sx styles', () => {
        const customSx = { backgroundColor: 'red' };
        render(<SearchBar {...defaultProps} sx={customSx} />);
        const container = screen.getByRole('textbox').closest('.MuiBox-root');
        expect(container).toHaveStyle('background-color: red');
    });
    it('shows custom icon when provided', () => {
        const CustomIcon = () => <div data-testid="custom-icon">Custom</div>;
        render(<SearchBar {...defaultProps} icon={<CustomIcon />} />);
        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
    it('prevents form submission on Enter key press', async () => {
        const user = userEvent.setup();
        const mockSubmit = jest.fn();
        render(
            <form onSubmit={mockSubmit}>
                <SearchBar {...defaultProps} />
            </form>
        );
        const input = screen.getByRole('textbox');
        await user.type(input, 'test');
        await user.keyboard('{Enter}');
        expect(mockSubmit).not.toHaveBeenCalled();
        expect(mockOnSearch).toHaveBeenCalledWith('test');
    });
    it('handles rapid typing correctly', async () => {
        const user = userEvent.setup();
        render(<SearchBar {...defaultProps} />);
        const input = screen.getByRole('textbox');
        await user.type(input, 'rapid typing test');
        expect(input).toHaveValue('rapid typing test');
    });
    it('maintains focus after search', async () => {
        const user = userEvent.setup();
        render(<SearchBar {...defaultProps} />);
        const input = screen.getByRole('textbox');
        const searchButton = screen.getByRole('button', { name: /search/i });
        await user.type(input, 'focus test');
        await user.click(searchButton);
        expect(input).toHaveFocus();
    });
    it('handles special characters in search term', async () => {
        const user = userEvent.setup();
        render(<SearchBar {...defaultProps} />);
        const input = screen.getByRole('textbox');
        const searchButton = screen.getByRole('button', { name: /search/i });
        const specialText = '!@#$%^&*()';
        await user.type(input, specialText);
        await user.click(searchButton);
        expect(mockOnSearch).toHaveBeenCalledWith(specialText);
    });
    it('updates when initialValue prop changes', () => {
        const { rerender } = render(<SearchBar {...defaultProps} initialValue="initial" />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('initial');
        rerender(<SearchBar {...defaultProps} initialValue="updated" />);
        expect(input).toHaveValue('updated');
    });
});