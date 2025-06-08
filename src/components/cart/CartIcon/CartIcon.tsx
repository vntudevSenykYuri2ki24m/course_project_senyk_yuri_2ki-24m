import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks";
import { ROUTES } from "@/utils";
import styles from "./CartIcon.module.css";

interface CartIconProps {
  showLabel?: boolean;
}

export const CartIcon: React.FC<CartIconProps> = ({ showLabel = false }) => {
  const { cart } = useCart();

  return (
    <Link to={ROUTES.CART} className={styles.cartIcon} aria-label="View cart">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 2L6 9H22L19 2H9Z" />
        <path d="M6 9H6.01" />
        <path d="M22 9H22.01" />
        <path d="M6 9L6 22H18V9" />
        <path d="M9 22V12" />
        <path d="M15 22V12" />
      </svg>
      {cart.itemCount > 0 && (
        <span className={styles.badge}>{cart.itemCount}</span>
      )}
      {showLabel && <span className={styles.label}>Cart</span>}
    </Link>
  );
};
