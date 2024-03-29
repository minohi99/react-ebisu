"use client"

import Logo from "@/components/Logo";
import Nav from "@/components/Nav";
import styles from "@/styles/header.module.css";
import Container from "@/components/Container";

const Header = () => {
  return (
    <header>
      <Container large>
        <div className={styles.flexContainer}>
          <Logo boxOn />
          <Nav />
        </div>
      </Container>
    </header>
  );
};
export default Header;
