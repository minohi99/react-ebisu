import Link from "next/link";
import styles from "@/styles/logo.module.css";

type LogoType = {
  boxOn?: Boolean;
};

const Logo = ({ boxOn = false }: LogoType) => {
  return (
    <Link className={boxOn ? styles.box : styles.basic} href="/">
      CUBE
    </Link>
  );
};

export default Logo;
