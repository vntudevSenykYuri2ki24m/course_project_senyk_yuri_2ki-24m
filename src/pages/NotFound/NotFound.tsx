import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/utils";
import { useTranslation } from "react-i18next";

export const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "6rem",
          fontWeight: "700",
          color: "#e5e7eb",
          margin: "0",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#111827",
          margin: "0 0 1rem 0",
        }}
      >
        {t("notFound.title")}
      </h2>
      <p
        style={{
          fontSize: "1.125rem",
          color: "#6b7280",
          margin: "0 0 2rem 0",
          maxWidth: "500px",
        }}
      >
        {t("notFound.message")}
      </p>
      <Link to={ROUTES.HOME}>
        <Button size="large">{t("notFound.backToHome")}</Button>
      </Link>
    </div>
  );
};
