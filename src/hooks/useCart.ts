import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { RootState, AppDispatch } from "@/store";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/store/slices/cartSlice";
import { Product } from "@/types";

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);

  const handleAddToCart = useCallback(
    (product: Product) => {
      dispatch(addToCart(product));
    },
    [dispatch],
  );

  const handleRemoveFromCart = useCallback(
    (productId: number) => {
      dispatch(removeFromCart(productId));
    },
    [dispatch],
  );

  const handleUpdateQuantity = useCallback(
    (productId: number, quantity: number) => {
      dispatch(updateQuantity({ productId, quantity }));
    },
    [dispatch],
  );

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const isInCart = useCallback(
    (productId: number) => {
      return cart.items.some((item) => item.product.id === productId);
    },
    [cart.items],
  );

  const getItemQuantity = useCallback(
    (productId: number) => {
      const item = cart.items.find((item) => item.product.id === productId);
      return item ? item.quantity : 0;
    },
    [cart.items],
  );

  return {
    cart,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    isInCart,
    getItemQuantity,
  };
};
