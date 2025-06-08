import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;
    isCartOpen: boolean;
    isMobileMenuOpen: boolean;
    isFilterOpen: boolean;
    checkoutStep: string;
}

const initialState: UiState = {
    isLoading: false,
    error: null,
    successMessage: null,
    isCartOpen: false,
    isMobileMenuOpen: false,
    isFilterOpen: false,
    checkoutStep: 'shipping',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

        setSuccessMessage: (state, action: PayloadAction<string | null>) => {
            state.successMessage = action.payload;
        },

        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },

        setCartOpen: (state, action: PayloadAction<boolean>) => {
            state.isCartOpen = action.payload;
        },

        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },

        setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
            state.isMobileMenuOpen = action.payload;
        },

        toggleFilter: (state) => {
            state.isFilterOpen = !state.isFilterOpen;
        },

        setFilterOpen: (state, action: PayloadAction<boolean>) => {
            state.isFilterOpen = action.payload;
        },

        setCheckoutStep: (state, action: PayloadAction<string>) => {
            state.checkoutStep = action.payload;
        },

        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },

        resetUi: (state) => {
            return initialState;
        },
    },
});

export const {
    setLoading,
    setError,
    setSuccessMessage,
    toggleCart,
    setCartOpen,
    toggleMobileMenu,
    setMobileMenuOpen,
    toggleFilter,
    setFilterOpen,
    setCheckoutStep,
    clearMessages,
    resetUi,
} = uiSlice.actions;

export default uiSlice.reducer;