"use client";

import Cabecalho from "@/src/components/shared/Cabecalho";
import Logo from "@/src/components/shared/logo/Logo";

export default function LandingPage() {
  return (
    <div className="container__landingpage">
      <Cabecalho />
      <div className="container__landingpage-conteudo">
        <Logo />
      </div>
    </div>
  );
}
