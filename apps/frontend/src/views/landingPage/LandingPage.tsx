"use client";

import "./landing-page.css";

import Cabecalho from "@/src/components/shared/Cabecalho";
import Logo from "@/src/components/shared/logo/Logo";

export default function LandingPage() {
  return (
    <div className="landingpage__container">
      <Cabecalho />
      <div className="landingpage__container-conteudo">
        <Logo />
      </div>
    </div>
  );
}
