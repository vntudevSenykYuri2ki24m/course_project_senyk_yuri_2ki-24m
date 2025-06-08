import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useProductsWithFilters, usePagination } from "@/hooks";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductFilter } from "@/components/product/ProductFilter";
import { CategorySelector } from "@/components/product/CategorySelector";
import { Pagination } from "@/components/ui/Pagination";
import { ITEMS_PER_PAGE } from "@/utils";
import { useTranslation } from "react-i18next";
import styles from "./Catalog.module.css";

export const Catalog: React.FC = () => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filters = useSelector((state: RootState) => state.product.filters);
  const selectedCategory = useSelector(
    (state: RootState) => state.product.selectedCategory,
  );

  const combinedFilters = {
    ...filters,
    category: selectedCategory || undefined,
  };

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useProductsWithFilters(
    combinedFilters,
    currentPage,
    ITEMS_PER_PAGE,
  );

  const { totalPages, pageNumbers, hasNextPage, hasPreviousPage } =
    usePagination(data?.total || 0, {
      initialPage: currentPage,
      itemsPerPage: ITEMS_PER_PAGE,
    });

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, selectedCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.catalog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t("catalog.title")}</h1>
          <button
            className={styles.filterToggle}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            aria-label="Toggle filters"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
            {t("catalog.filter")}
          </button>
        </div>

        <CategorySelector />

        <div className={styles.content}>
          <aside
            className={`${styles.sidebar} ${isFilterOpen ? styles.sidebarOpen : ""}`}
          >
            <ProductFilter onClose={() => setIsFilterOpen(false)} />
          </aside>

          <main className={styles.main}>
            <div className={styles.resultsInfo}>
              {data && (
                <p className={styles.resultsText}>
                  {t("catalog.showing", {
                    from: (currentPage - 1) * ITEMS_PER_PAGE + 1,
                    to: Math.min(currentPage * ITEMS_PER_PAGE, data.total),
                    total: data.total,
                  })}
                </p>
              )}
            </div>

            <ProductGrid
              products={data?.products || []}
              loading={isLoading}
              error={error}
            />

            {data && data.totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                pageNumbers={pageNumbers}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
              />
            )}
          </main>
        </div>
      </div>

      {isFilterOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsFilterOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
