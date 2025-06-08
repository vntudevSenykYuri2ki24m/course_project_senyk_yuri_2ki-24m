import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/utils";
import { useTranslation } from "react-i18next";
import styles from "./Cart.module.css";

export const Cart: React.FC = () => {
  const { t } = useTranslation();
  const { cart, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyContainer}>
          <svg
            className={styles.emptyIcon}
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M9 2L6 9H22L19 2H9Z" />
            <path d="M6 9H6.01" />
            <path d="M22 9H22.01" />
            <path d="M6 9L6 22H18V9" />
            <path d="M9 22V12" />
            <path d="M15 22V12" />
          </svg>
          <h1 className={styles.emptyTitle}>{t("cart.empty")}</h1>
          <p className={styles.emptyMessage}>{t("cart.empty_message")}</p>
          <Link to={ROUTES.CATALOG}>
            <Button size="large">{t("cart.continue_shopping")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t("cart.title")}</h1>
          <button
            className={styles.clearButton}
            onClick={clearCart}
            aria-label="Clear cart"
          >
            {t("cart.clear")}
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.items}>
            {cart.items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          <div className={styles.summary}>
            <CartSummary cart={cart} />
          </div>
        </div>

        <div className={styles.continueShopping}>
          <Link to={ROUTES.CATALOG}>
            <Button variant="outline">{t("cart.continue_shopping")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
