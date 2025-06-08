import React from "react";
import { Cart } from "@/types";
import { formatPrice } from "@/utils";
import styles from "../Checkout.module.css";
import { useTranslation } from "react-i18next";

interface OrderSummaryProps {
  cart: Cart;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ cart }) => {
  const { t } = useTranslation();

  const subtotal = cart.total;
  const shipping = cart.total > 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className={styles.orderSummary}>
      <h3 className={styles.orderTitle}>
        {t("checkout.orderSummary", "Order Summary") ?? ""}
      </h3>

      <div className={styles.orderItems}>
        {cart.items.map((item) => (
          <div key={item.product.id} className={styles.orderItem}>
            <img
              src={item.product.image}
              alt={item.product.title}
              className={styles.orderItemImage}
            />
            <div className={styles.orderItemDetails}>
              <p className={styles.orderItemName}>{item.product.title}</p>
              <p className={styles.orderItemInfo}>
                {t("cart.quantity", "Qty") ?? ""}: {item.quantity} ×{" "}
                {formatPrice(item.product.price)}
              </p>
            </div>
            <p className={styles.orderItemPrice}>
              {formatPrice(item.product.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className={styles.orderTotals}>
        <div className={styles.orderRow}>
          <span>{t("cart.summary.subtotal", "Subtotal") ?? ""}</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className={styles.orderRow}>
          <span>{t("cart.summary.shipping", "Shipping") ?? ""}</span>
          <span>
            {shipping === 0
              ? t("cart.summary.free", "FREE")
              : formatPrice(shipping)}
          </span>
        </div>
        <div className={styles.orderRow}>
          <span>{t("cart.summary.tax", "Tax") ?? ""}</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className={styles.orderDivider} />
        <div className={`${styles.orderRow} ${styles.orderTotal}`}>
          <span>{t("cart.summary.total", "Total") ?? ""}</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
};
