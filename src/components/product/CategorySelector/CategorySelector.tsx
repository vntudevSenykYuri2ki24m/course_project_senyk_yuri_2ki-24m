import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setCategory } from "@/store";
import { useCategories } from "@/hooks";
import { useTranslation } from "react-i18next";
import styles from "./CategorySelector.module.css";

export const CategorySelector: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: RootState) => state.product.selectedCategory,
  );
  const { data: categories, isLoading, error } = useCategories();

  const handleCategoryChange = (category: string | null) => {
    dispatch(setCategory(category));
  };

  if (isLoading) {
    return <div className={styles.loading}>{t("loading.categories")}</div>;
  }

  if (error) {
    return <div className={styles.error}>{t("error.loading.categories")}</div>;
  }

  return (
    <div className={styles.categorySelector}>
      <button
        className={`${styles.categoryButton} ${!selectedCategory ? styles.active : ""}`}
        onClick={() => handleCategoryChange(null)}
      >
        {t("categories.all")}
      </button>
      {categories?.map((category) => (
        <button
          key={category}
          className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ""}`}
          onClick={() => handleCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
