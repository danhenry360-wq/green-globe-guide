// src/hooks/useSearch.ts
// Custom hook for search functionality with autocomplete and keyboard navigation

import { useState, useMemo, useEffect, useRef, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { SearchItem } from "@/data/search-data";

interface UseSearchOptions {
    minQueryLength?: number;
    maxSuggestions?: number;
}

interface UseSearchReturn {
    // State
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    showSuggestions: boolean;
    setShowSuggestions: (show: boolean) => void;
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    suggestions: SearchItem[];

    // Refs
    searchRef: React.RefObject<HTMLDivElement>;
    inputRef: React.RefObject<HTMLInputElement>;

    // Handlers
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    handleSelectSuggestion: (item: SearchItem) => void;
    handleSearchSubmit: () => void;

    // Utilities
    getTypeIcon: (type: string) => string;
}

export const useSearch = (
    allItems: SearchItem[],
    options: UseSearchOptions = {}
): UseSearchReturn => {
    const { minQueryLength = 2, maxSuggestions = 8 } = options;

    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const navigate = useNavigate();
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Filter and sort suggestions based on search term
    const suggestions = useMemo(() => {
        if (!searchTerm.trim() || searchTerm.length < minQueryLength) return [];

        const query = searchTerm.toLowerCase();
        return allItems
            .filter(item => item.name.toLowerCase().includes(query))
            .sort((a, b) => {
                // Prioritize items that start with the query
                const aStarts = a.name.toLowerCase().startsWith(query);
                const bStarts = b.name.toLowerCase().startsWith(query);
                if (aStarts && !bStarts) return -1;
                if (!aStarts && bStarts) return 1;
                return a.name.localeCompare(b.name);
            })
            .slice(0, maxSuggestions);
    }, [searchTerm, allItems, minQueryLength, maxSuggestions]);

    // Handle click outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle suggestion selection
    const handleSelectSuggestion = (item: SearchItem) => {
        setSearchTerm("");
        setShowSuggestions(false);
        setSelectedIndex(-1);
        navigate(item.path);
    };

    // Handle search form submission
    const handleSearchSubmit = () => {
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
            handleSelectSuggestion(suggestions[selectedIndex]);
        } else if (searchTerm.trim()) {
            navigate(`/usa?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions || suggestions.length === 0) {
            if (e.key === 'Enter' && searchTerm.trim()) {
                navigate(`/usa?search=${encodeURIComponent(searchTerm.trim())}`);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
                    handleSelectSuggestion(suggestions[selectedIndex]);
                } else if (searchTerm.trim()) {
                    navigate(`/usa?search=${encodeURIComponent(searchTerm.trim())}`);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
        }
    };

    // Get icon based on search item type
    const getTypeIcon = (type: string): string => {
        switch (type) {
            case 'state': return '🇺🇸';
            case 'country': return '🌍';
            case 'city': return '🏙️';
            default: return '📍';
        }
    };

    return {
        searchTerm,
        setSearchTerm,
        showSuggestions,
        setShowSuggestions,
        selectedIndex,
        setSelectedIndex,
        suggestions,
        searchRef,
        inputRef,
        handleKeyDown,
        handleSelectSuggestion,
        handleSearchSubmit,
        getTypeIcon,
    };
};
