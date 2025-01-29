"use client";

import Cabecalho from "@/src/components/shared/Cabecalho";
import Logo from "@/src/components/shared/logo/Logo";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landingpage__container}>
      <Cabecalho />
      <div className={styles.landingpage__container_conteudo}>
        <Logo />
      </div>
    </div>
  );
}
