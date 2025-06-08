import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageNumbers: (number | string)[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageNumbers,
  hasNextPage,
  hasPreviousPage,
}) => {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  return (
    <nav
      className={styles.pagination}
      aria-label={t("navigation.pagination", "Pagination") ?? ""}
    >
      <button
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
        aria-label={t("navigation.previousPage", "Previous page") ?? ""}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className={styles.pageNumbers}>
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <span key={`dots-${index}`} className={styles.dots}>
                ...
              </span>
            );
          }

          const page = pageNumber as number;
          return (
            <button
              key={page}
              className={`${styles.pageButton} ${currentPage === page ? styles.active : ""}`}
              onClick={() => onPageChange(page)}
              aria-label={
                t("navigation.goToPage", "Go to page {{page}}", { page }) ?? ""
              }
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        aria-label={t("navigation.nextPage", "Next page") ?? ""}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </nav>
  );
};
