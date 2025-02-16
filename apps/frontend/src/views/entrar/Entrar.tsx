"use client";

import { useSearchParams } from "next/navigation";

import FormAuth from "@/src/components/auth/FormAuth";
import { AuthProvider } from "@/src/data/contexts/AuthContext";

export default function Entrar() {
  const searchParams = useSearchParams();
  const destino = searchParams.get("destino") || "/dashboard";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <AuthProvider>
        <FormAuth redirectPath={destino} />
      </AuthProvider>
    </div>
  );
}
