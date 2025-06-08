import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/utils";
import styles from "./Footer.module.css";
import { useTranslation } from "react-i18next";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t("common.logo")}</h3>
            <p className={styles.sectionText}>{t("common.description")}</p>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
              {t("navigation.labels.quick_links")}
            </h4>
            <nav className={styles.links}>
              <Link to={ROUTES.HOME} className={styles.link}>
                {t("navigation.home")}
              </Link>
              <Link to={ROUTES.CATALOG} className={styles.link}>
                {t("navigation.catalog")}
              </Link>
              <Link to={ROUTES.CART} className={styles.link}>
                {t("navigation.cart")}
              </Link>
            </nav>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
              {t("navigation.labels.custom_service")}
            </h4>
            <div className={styles.links}>
              <Link to={ROUTES.HOME} className={styles.link}>
                {t("footer.aboutUs")}
              </Link>
              <Link to={ROUTES.HOME} className={styles.link}>
                {t("footer.contacts")}
              </Link>
              <Link to={ROUTES.HOME} className={styles.link}>
                {t("footer.termsOfService")}
              </Link>
              <Link to={ROUTES.HOME} className={styles.link}>
                {t("footer.faq")}
              </Link>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
              {t("navigation.labels.connect")}
            </h4>
            <div className={styles.links}>
              <Link to={ROUTES.HOME} className={styles.link}>
                Facebook
              </Link>
              <Link to={ROUTES.HOME} className={styles.link}>
                Twitter
              </Link>
              <Link to={ROUTES.HOME} className={styles.link}>
                Instagram
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};
