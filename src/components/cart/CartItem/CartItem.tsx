import React from "react";
import { Link } from "react-router-dom";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/hooks";
import { formatPrice } from "@/utils";
import { Button } from "@/components/ui/Button";
import styles from "./CartItem.module.css";
import { useTranslation } from "react-i18next";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { t } = useTranslation();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.product.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.product.id);
  };

  return (
    <div className={styles.cartItem}>
      <Link to={`/product/${item.product.id}`} className={styles.imageLink}>
        <img
          src={item.product.image}
          alt={item.product.title}
          className={styles.image}
        />
      </Link>

      <div className={styles.content}>
        <Link to={`/product/${item.product.id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{item.product.title}</h3>
        </Link>
        <p className={styles.category}>{item.product.category}</p>
        <p className={styles.price}>{formatPrice(item.product.price)}</p>
      </div>

      <div className={styles.actions}>
        <div className={styles.quantityControl}>
          <button
            className={styles.quantityButton}
            onClick={() => handleQuantityChange(item.quantity - 1)}
            aria-label={t("cart.decreaseQuantity", "Зменшити кількість") ?? ""}
          >
            -
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button
            className={styles.quantityButton}
            onClick={() => handleQuantityChange(item.quantity + 1)}
            aria-label={t("cart.increaseQuantity", "Збільшити кількість") ?? ""}
          >
            +
          </button>
        </div>
        <p className={styles.subtotal}>
          {formatPrice(item.product.price * item.quantity)}
        </p>
        <Button
          variant="danger"
          size="small"
          onClick={handleRemove}
          aria-label={t("cart.removeFromCart", "Видалити із кошика") ?? ""}
        >
          {t("cart.remove", "Видалити")}
        </Button>
      </div>
    </div>
  );
};
