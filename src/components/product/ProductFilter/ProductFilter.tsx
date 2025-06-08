import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setPriceRange, setSortBy } from "@/store";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SORT_OPTIONS, PRICE_RANGE } from "@/utils";
import { useTranslation } from "react-i18next";
import styles from "./ProductFilter.module.css";

interface ProductFilterProps {
  onClose?: () => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.product.filters);
  const { t } = useTranslation();

  const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() || "");
  const [selectedSort, setSelectedSort] = useState(
    filters.sortBy && filters.sortOrder
      ? `${filters.sortBy}-${filters.sortOrder}`
      : "",
  );

  const handleApplyFilters = () => {
    const min = minPrice ? parseFloat(minPrice) : undefined;
    const max = maxPrice ? parseFloat(maxPrice) : undefined;

    dispatch(setPriceRange({ minPrice: min, maxPrice: max }));

    if (selectedSort) {
      const [sortBy, sortOrder] = selectedSort.split("-") as [
        "price" | "rating" | "title",
        "asc" | "desc",
      ];
      dispatch(setSortBy({ sortBy, sortOrder }));
    }

    if (onClose) {
      onClose();
    }
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedSort("");
    dispatch(setPriceRange({ minPrice: undefined, maxPrice: undefined }));
    dispatch(setSortBy({ sortBy: "title", sortOrder: "asc" }));
  };

  return (
    <div className={styles.filter}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t("catalog.filter", "Filters")}</h3>
        {onClose && (
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label={t("common.close", "Close filters") ?? ""}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>
          {t("catalog.priceRange", "Price Range")}
        </h4>
        <div className={styles.priceInputs}>
          <Input
            type="number"
            placeholder={t("catalog.min", "Min") ?? ""}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min={PRICE_RANGE.MIN}
            max={PRICE_RANGE.MAX}
          />
          <span className={styles.priceSeparator}>-</span>
          <Input
            type="number"
            placeholder={t("catalog.max", "Max") ?? ""}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min={PRICE_RANGE.MIN}
            max={PRICE_RANGE.MAX}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>{t("catalog.sorts", "Sort By")}</h4>
        <select
          className={styles.select}
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
          <option value="">{t("product.sort.default", "Default")}</option>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {t(`product.sort.${option.value}`, option.label)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.actions}>
        <Button onClick={handleApplyFilters} fullWidth>
          {t("common.apply", "Apply")}
        </Button>
        <Button onClick={handleReset} variant="secondary" fullWidth>
          {t("common.reset", "Reset")}
        </Button>
      </div>
    </div>
  );
};
