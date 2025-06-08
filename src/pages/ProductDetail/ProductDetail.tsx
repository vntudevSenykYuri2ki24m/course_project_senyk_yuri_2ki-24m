import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct, useRelatedProducts, useCart } from "@/hooks";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/common/Loader";
import { formatPrice } from "@/utils";
import styles from "./ProductDetail.module.css";
import { useTranslation } from "react-i18next";

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = id ? parseInt(id) : 0;

  const { data: product, isLoading, error } = useProduct(productId);
  const { data: relatedProducts } = useRelatedProducts(productId, 4);
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const { t } = useTranslation();

  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <Loader
        size="large"
        fullScreen
        message={
          t("loading.productDetails", "Loading product details...") ?? ""
        }
      />
    );
  }

  if (error || !product) {
    return (
      <div className={styles.errorContainer}>
        <h1 className={styles.errorTitle}>
          {t("product.notFound", "Product Not Found") ?? ""}
        </h1>
        <p className={styles.errorMessage}>
          {t(
            "product.notFoundMessage",
            "The product you're looking for doesn't exist or has been removed.",
          ) ?? ""}
        </p>
        <Button onClick={() => navigate("/catalog")}>
          {t("navigation.backToCatalog", "Back to Catalog") ?? ""}{" "}
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 99) {
      setQuantity(value);
    }
  };

  const inCart = isInCart(product.id);
  const cartQuantity = getItemQuantity(product.id);

  return (
    <div className={styles.productDetail}>
      <div className={styles.container}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/catalog")}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          {t("navigation.backToCatalog", "Back to Catalog") ?? ""}
        </button>

        <div className={styles.productContent}>
          <div className={styles.imageSection}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
            />
          </div>

          <div className={styles.infoSection}>
            <div className={styles.category}>{product.category}</div>
            <h1 className={styles.title}>{product.title}</h1>

            <div className={styles.rating}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`${styles.star} ${
                      index < Math.round(product.rating.rate)
                        ? styles.starFilled
                        : ""
                    }`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className={styles.ratingText}>
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <div className={styles.price}>{formatPrice(product.price)}</div>

            <div className={styles.description}>
              <h2 className={styles.descriptionTitle}>
                {t("product.description")}
              </h2>
              <p className={styles.descriptionText}>{product.description}</p>
            </div>

            <div className={styles.actions}>
              {!inCart ? (
                <>
                  <div className={styles.quantitySelector}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className={styles.quantityInput}
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(parseInt(e.target.value) || 1)
                      }
                      min="1"
                      max="99"
                    />
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= 99}
                    >
                      +
                    </button>
                  </div>
                  <Button size="large" onClick={handleAddToCart}>
                    {isInCart(product.id)
                      ? t("product.inCart")
                      : t("product.addToCart")}
                  </Button>
                </>
              ) : (
                <div className={styles.inCartMessage}>
                  <p>
                    ✓ {cartQuantity} {t("product.inCartItems")}
                  </p>
                  <Button
                    size="large"
                    variant="outline"
                    onClick={() => navigate("/cart")}
                  >
                    {t("product.inCart")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {relatedProducts && relatedProducts.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>{t("product.related")}</h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </div>
    </div>
  );
};
