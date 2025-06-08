import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { Product } from '@/types';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('@/store/slices/cartSlice', () => ({
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
}));

describe('useCart', () => {
    const mockDispatch = jest.fn();
    const mockProduct: Product = {
        id: 1,
        title: 'Test Product',
        price: 10,
        description: 'Test description',
        category: 'test',
        image: 'test.jpg',
        rating: {
            rate: 4.5,
            count: 10
        }
    };
    const mockCart = {
        items: [
            {
                product: {
                    id: 1,
                    title: 'Test Product',
                    price: 10,
                    description: 'Test description',
                    category: 'test',
                    image: 'test.jpg',
                    rating: {
                        rate: 4.5,
                        count: 10
                    }
                },
                quantity: 2
            },
            {
                product: {
                    id: 2,
                    title: 'Another Product',
                    price: 15,
                    description: 'Another description',
                    category: 'test',
                    image: 'test2.jpg',
                    rating: {
                        rate: 4.0,
                        count: 8
                    }
                },
                quantity: 1
            },
        ],
        totalItems: 3,
        totalPrice: 35,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
        (useSelector as unknown  as jest.Mock).mockImplementation((selector) => selector({ cart: mockCart }));
        (addToCart as unknown  as jest.Mock).mockReturnValue({ type: 'cart/addToCart' });
        (removeFromCart as unknown  as jest.Mock).mockReturnValue({ type: 'cart/removeFromCart' });
        (updateQuantity as unknown  as jest.Mock).mockReturnValue({ type: 'cart/updateQuantity' });
        (clearCart as unknown  as jest.Mock).mockReturnValue({ type: 'cart/clearCart' });
    });

    test('повертає стан корзини зі стору', () => {
        const { result } = renderHook(() => useCart());

        expect(result.current.cart).toEqual(mockCart);
    });

    test('addToCart викликає відповідну дію', () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addToCart(mockProduct);
        });

        expect(addToCart).toHaveBeenCalledWith(mockProduct);
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'cart/addToCart' });
    });

    test('removeFromCart викликає відповідну дію', () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.removeFromCart(1);
        });

        expect(removeFromCart).toHaveBeenCalledWith(1);
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'cart/removeFromCart' });
    });

    test('updateQuantity викликає відповідну дію', () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.updateQuantity(1, 5);
        });

        expect(updateQuantity).toHaveBeenCalledWith({ productId: 1, quantity: 5 });
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'cart/updateQuantity' });
    });

    test('clearCart викликає відповідну дію', () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.clearCart();
        });

        expect(clearCart).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'cart/clearCart' });
    });

    test('isInCart повертає true для товарів у корзині', () => {
        const { result } = renderHook(() => useCart());

        expect(result.current.isInCart(1)).toBe(true);
        expect(result.current.isInCart(3)).toBe(false);
    });

    test('getItemQuantity повертає кількість товару', () => {
        const { result } = renderHook(() => useCart());

        expect(result.current.getItemQuantity(1)).toBe(2);
        expect(result.current.getItemQuantity(2)).toBe(1);
        expect(result.current.getItemQuantity(3)).toBe(0);
    });
});