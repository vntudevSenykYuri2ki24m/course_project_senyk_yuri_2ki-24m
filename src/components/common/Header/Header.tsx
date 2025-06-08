import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "@/hooks";
import { ROUTES } from "@/utils";
import styles from "./Header.module.css";
import { useTranslation } from "react-i18next";

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          {t("common.logo")}
        </Link>

        <nav
          className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ""}`}
        >
          <NavLink
            to={ROUTES.HOME}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("navigation.home")}
          </NavLink>
          <NavLink
            to={ROUTES.CATALOG}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("navigation.catalog")}
          </NavLink>
          <NavLink
            to={ROUTES.CART}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("navigation.cart")}
            {cart.itemCount > 0 && (
              <span className={styles.cartBadge}>{cart.itemCount}</span>
            )}
          </NavLink>
        </nav>

        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>
    </header>
  );
};
