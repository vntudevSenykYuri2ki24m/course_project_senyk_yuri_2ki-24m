import React from "react";
import { Link } from "react-router-dom";
import { useFeaturedProducts } from "@/hooks";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/utils";
import { useTranslation } from "react-i18next";
import styles from "./Home.module.css";

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const { data: featuredProducts, isLoading, error } = useFeaturedProducts(8);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{t("home.title")}</h1>
          <p className={styles.heroSubtitle}>{t("home.subtitle")}</p>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 11L3 17V20H6L12 14M9 11L11 9M9 11L12 14M11 9L13 7M11 9L12 14M13 7L15 5M13 7L12 14M15 5L21 11L15 17L12 14" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>
                {t("home.features.quality.title")}
              </h3>
              <p className={styles.featureDescription}>
                {t("home.features.quality.description")}
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="1" y="3" width="15" height="13" rx="2" />
                  <path d="M16 8L20 12L16 16" />
                  <path d="M12 12H20" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>
                {t("home.features.shipping.title")}
              </h3>
              <p className={styles.featureDescription}>
                {t("home.features.shipping.description")}
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7V17C2 19.21 8.5 22 12 22C15.5 22 22 19.21 22 17V7L12 2Z" />
                  <path d="M12 11L17 8M12 11L7 8M12 11V17" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>
                {t("home.features.payment.title")}
              </h3>
              <p className={styles.featureDescription}>
                {t("home.features.payment.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t("home.featuredProducts")}</h2>
          <ProductGrid
            products={featuredProducts || []}
            loading={isLoading}
            error={error}
          />
          <div className={styles.viewMoreContainer}>
            <Link to={ROUTES.CATALOG}>
              <Button variant="outline">{t("home.viewMore")}</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
