"use client";

import Logo from "@/src/components/logo/Logo";
import Cabecalho from "@/src/components/shared/Cabecalho";

export default function LandingPage() {
  return (
    <div className="containerLandingPage">
      <Cabecalho />
      <div className="conteudoLandingPage">
        <Logo />
      </div>
    </div>
  );
}
