import React from "react";
import { Product } from "@/types";
import { ProductCard } from "../ProductCard";
import { Loader } from "@/components/common/Loader";
import { useTranslation } from "react-i18next";
import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  error?: Error | null;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  error,
}) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <Loader
        size="large"
        message={t("loading.products", "Loading products...") ?? ""}
      />
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>
          {t(
            "error.loadProducts",
            "Failed to load products. Please try again later.",
          )}
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p className={styles.emptyText}>
          {t("catalog.noProducts", "No products found matching your criteria.")}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
