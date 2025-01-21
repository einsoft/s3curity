import { Suspense } from "react";

import Processando from "@/src/components/shared/Processando";
import Entrar from "@/src/views/entrar/Entrar";

const Page: React.FC = () => {
  return (
    <Suspense fallback={<Processando />}>
      <Entrar />
    </Suspense>
  );
};

export default Page;
