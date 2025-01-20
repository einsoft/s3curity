"use client";

import Cabecalho from "@/components/shared/Cabecalho";
import Logo from "@/src/components/logo/Logo";

export default function LandingPage() {
  return (
    <div className="containerLandingPage">
      <div className="menuCabecalho">
        <Cabecalho />
      </div>
      <div className="conteudoLandingPage">
        <Logo />
      </div>
    </div>
  );
}
