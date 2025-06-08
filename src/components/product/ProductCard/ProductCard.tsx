import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { useCart } from "@/hooks";
import { formatPrice, truncateText } from "@/utils";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useTranslation();
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{truncateText(product.title, 50)}</h3>
        <p className={styles.category}>{product.category}</p>
        <div className={styles.rating}>
          <span className={styles.stars}>
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`${styles.star} ${
                  index < Math.round(product.rating.rate)
                    ? styles.starFilled
                    : ""
                }`}
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </span>
          <span className={styles.ratingText}>
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>
        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <Button
            size="small"
            variant={isInCart(product.id) ? "secondary" : "primary"}
            onClick={handleAddToCart}
          >
            {isInCart(product.id)
              ? t("product.inCart")
              : t("product.addToCart")}
          </Button>
        </div>
      </div>
    </Link>
  );
};
