import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductFilter } from '@/types';

interface ProductState {
    filters: ProductFilter;
    selectedCategory: string | null;
    searchQuery: string;
    currentPage: number;
}

const initialState: ProductState = {
    filters: {
        sortBy: 'title',
        sortOrder: 'asc',
    },
    selectedCategory: null,
    searchQuery: '',
    currentPage: 1,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<ProductFilter>>) => {
            state.filters = { ...state.filters, ...action.payload };
            state.currentPage = 1;
        },

        setCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;
            state.currentPage = 1;
        },

        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.currentPage = 1;
        },

        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },

        resetFilters: (state) => {
            state.filters = initialState.filters;
            state.selectedCategory = null;
            state.searchQuery = '';
            state.currentPage = 1;
        },

        setSortBy: (state, action: PayloadAction<{ sortBy: 'price' | 'rating' | 'title'; sortOrder: 'asc' | 'desc' }>) => {
            state.filters.sortBy = action.payload.sortBy;
            state.filters.sortOrder = action.payload.sortOrder;
            state.currentPage = 1;
        },

        setPriceRange: (state, action: PayloadAction<{ minPrice?: number; maxPrice?: number }>) => {
            state.filters.minPrice = action.payload.minPrice;
            state.filters.maxPrice = action.payload.maxPrice;
            state.currentPage = 1;
        },
    },
});

export const {
    setFilters,
    setCategory,
    setSearchQuery,
    setCurrentPage,
    resetFilters,
    setSortBy,
    setPriceRange,
} = productSlice.actions;

export default productSlice.reducer
