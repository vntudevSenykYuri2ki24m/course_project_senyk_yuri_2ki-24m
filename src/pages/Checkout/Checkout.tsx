import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks";
import { CheckoutForm } from "./components/CheckoutForm";
import { OrderSummary } from "./components/OrderSummary";
import { Button } from "@/components/ui/Button";
import { CheckoutForm as CheckoutFormType } from "@/types";
import { ROUTES } from "@/utils";
import { useTranslation } from "react-i18next";
import styles from "./Checkout.module.css";

export const Checkout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (cart.items.length === 0 && !orderComplete) {
    navigate(ROUTES.CART);
    return null;
  }

  const handleSubmit = async (formData: CheckoutFormType) => {
    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      clearCart();
      setOrderComplete(true);
      setIsProcessing(false);
    } catch (error) {
      console.error("Order processing failed:", error);
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className={styles.checkout}>
        <div className={styles.successContainer}>
          <div className={styles.successContent}>
            <svg
              className={styles.successIcon}
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h1 className={styles.successTitle}>
              {t("checkout.orderSuccess")}
            </h1>
            <p className={styles.successMessage}>
              {t("checkout.successMessage")}
            </p>
            <p className={styles.orderNumber}>
              {t("checkout.orderNumber")}:{" "}
              {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <Button onClick={() => navigate(ROUTES.HOME)} size="large">
              {t("cart.continue_shopping")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkout}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t("checkout.title")}</h1>

        <div className={styles.content}>
          <div className={styles.formSection}>
            <CheckoutForm onSubmit={handleSubmit} loading={isProcessing} />
          </div>

          <div className={styles.summarySection}>
            <OrderSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
};
