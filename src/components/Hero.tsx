import styles from "@/styles/hero.module.css";
import Cube from "@/images/cube.jpg";
import Image from "next/image";

type HeroProps = {
  title: string;
  subtitle: string;
  imageOn?: boolean;
};

const Hero = ({ title, subtitle, imageOn = false }: HeroProps) => {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      {imageOn && (
        <figure className="styles.image">
          <Image
            src={Cube}
            alt=""
            layout="responsive"
            sizes="(min-width:1152px) 576px, (min-width:768px) 50vw, 100vw"
            priority
            placeholder="blur"
          />
        </figure>
      )}
    </div>
  );
};
export default Hero;
