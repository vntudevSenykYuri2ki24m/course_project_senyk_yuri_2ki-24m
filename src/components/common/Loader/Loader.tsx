import React from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  fullScreen?: boolean;
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  fullScreen = false,
  message,
}) => {
  const loaderContent = (
    <div className={styles.loaderWrapper}>
      <div className={`${styles.loader} ${styles[size]}`}>
        <div className={styles.spinner}></div>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className={styles.fullScreenOverlay}>{loaderContent}</div>;
  }

  return loaderContent;
};
