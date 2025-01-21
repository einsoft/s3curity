"use client";

import Logo from "@/src/components/logo/Logo";
import Cabecalho from "@/src/components/shared/Cabecalho";

export default function LandingPage() {
  return (
    <div className="container__landingpage">
      <Cabecalho />
      <div className="container__landingpage--conteudo">
        <Logo />
      </div>
    </div>
  );
}
