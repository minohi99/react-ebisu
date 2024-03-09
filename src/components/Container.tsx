import styles from "@/styles/container.module.css";
import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  large?: boolean;
};

const Container = ({ children, large = false }: ContainerProps) => {
  return (
    <div className={large ? styles.large : styles.default}>{children}</div>
  );
};

export default Container;
