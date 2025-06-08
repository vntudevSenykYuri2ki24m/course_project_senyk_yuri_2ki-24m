import React from "react";
import { useNavigate } from "react-router-dom";
import { Cart } from "@/types";
import { formatPrice, ROUTES } from "@/utils";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import styles from "./CartSummary.module.css";

interface CartSummaryProps {
  cart: Cart;
  showCheckoutButton?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  cart,
  showCheckoutButton = true,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate(ROUTES.CHECKOUT);
  };

  const subtotal = cart.total;
  const shipping = cart.total > 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>{t("cart.summary.title")}</h2>

      <div className={styles.details}>
        <div className={styles.row}>
          <span className={styles.label}>
            {t("cart.summary.subtotal", { count: cart.itemCount })}
          </span>
          <span className={styles.value}>{formatPrice(subtotal)}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>{t("cart.summary.shipping")}</span>
          <span className={styles.value}>
            {shipping === 0 ? t("cart.summary.free") : formatPrice(shipping)}
          </span>
        </div>

        {shipping > 0 && (
          <p className={styles.shippingNote}>
            {t("cart.summary.freeShippingNote")}
          </p>
        )}

        <div className={styles.row}>
          <span className={styles.label}>{t("cart.summary.tax")}</span>
          <span className={styles.value}>{formatPrice(tax)}</span>
        </div>

        <div className={styles.divider} />

        <div className={`${styles.row} ${styles.total}`}>
          <span className={styles.label}>{t("cart.summary.total")}</span>
          <span className={styles.value}>{formatPrice(total)}</span>
        </div>
      </div>

      {showCheckoutButton && cart.itemCount > 0 && (
        <Button onClick={handleCheckout} size="large" fullWidth>
          {t("cart.summary.proceedToCheckout")}
        </Button>
      )}
    </div>
  );
};
