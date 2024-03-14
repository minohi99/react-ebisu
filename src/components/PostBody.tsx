import styles from "@/styles/post-body.module.css";
import React from "react";

type PostBodyProps = {
  children: React.ReactNode;
};

const PostBody = ({ children }: PostBodyProps) => {
  return <div className={styles.stack}>{children}</div>;
};

export default PostBody;
