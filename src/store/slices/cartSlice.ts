import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem, Product } from '@/types';
import { STORAGE_KEYS } from '@/utils';

const loadCartFromStorage = (): Cart => {
    try {
        const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
        if (savedCart) {
            return JSON.parse(savedCart);
        }
    } catch (error) {
        console.error('Error loading cart from storage:', error);
    }

    return {
        items: [],
        total: 0,
        itemCount: 0,
    };
};

const saveCartToStorage = (cart: Cart) => {
    try {
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart to storage:', error);
    }
};

const calculateCartTotals = (items: CartItem[]): { total: number; itemCount: number } => {
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    return { total, itemCount };
};

const initialState: Cart = loadCartFromStorage();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.product.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    product: action.payload,
                    quantity: 1,
                });
            }

            const { total, itemCount } = calculateCartTotals(state.items);
            state.total = total;
            state.itemCount = itemCount;
            saveCartToStorage(state);
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.product.id !== action.payload);
            const { total, itemCount } = calculateCartTotals(state.items);
            state.total = total;
            state.itemCount = itemCount;
            saveCartToStorage(state);
        },

        updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
            const item = state.items.find(item => item.product.id === action.payload.productId);

            if (item) {
                if (action.payload.quantity <= 0) {
                    state.items = state.items.filter(item => item.product.id !== action.payload.productId);
                } else {
                    item.quantity = action.payload.quantity;
                }

                const { total, itemCount } = calculateCartTotals(state.items);
                state.total = total;
                state.itemCount = itemCount;
                saveCartToStorage(state);
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.total = 0;
            state.itemCount = 0;
            saveCartToStorage(state);
        },

        loadCart: (state) => {
            const savedCart = loadCartFromStorage();
            state.items = savedCart.items;
            state.total = savedCart.total;
            state.itemCount = savedCart.itemCount;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;