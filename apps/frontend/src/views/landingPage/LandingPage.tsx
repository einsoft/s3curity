"use client";

import Cabecalho from "@/src/components/shared/Cabecalho";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landingpage__container}>
      <Cabecalho />
      <div className={styles.landingpage__container_conteudo}></div>
    </div>
  );
}
