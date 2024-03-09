import styles from "@/styles/twocolumn.module.css";
import React from "react";

type TwoColumnProps = {
  children: React.ReactNode;
};

const TwoColumn = ({ children }: TwoColumnProps) => {
  return <div className={styles.flexContainer}>{children}</div>;
};
export default TwoColumn;

export const TwoColumnMain = ({ children }: TwoColumnProps) => {
  return <div className={styles.main}>{children}</div>;
};

export const TwoColumnSidebar = ({ children }: TwoColumnProps) => {
  return <div className={styles.sidebar}>{children}</div>;
};
