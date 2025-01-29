"use client";

import CampoTexto from "@/src/components/shared/formulario/CampoTexto";
import { Button } from "@/src/components/ui/button";
import usePerfil from "@/src/data/hooks/usePerfil";
import styles from "./perfil.module.css";

export default function CadastroPerfil() {
  const { nome, descricao, status, setNome, setDescricao, setStatus } =
    usePerfil();

  function handleSubmit() {
    console.log("Salvando perfil");
  }

  return (
    <div className="flex flex-col bg-zinc-900 text-white p-6 rounded-xl shadow-lg w-full">
      <div className="mb-4 w-full">
        <label
          className="block text-sm font-medium text-gray-400"
          htmlFor="nome"
        >
          Nome perfil
        </label>
        <CampoTexto
          id="nome"
          value={nome}
          placeholder="Cadastrar novo perfil (incluir)"
          onChangeText={setNome}
        />
      </div>

      <div className="mb-4  w-full">
        <label
          className="block text-sm font-medium text-gray-400"
          htmlFor="descricao"
        >
          Descrição perfil
        </label>
        <CampoTexto
          value={descricao}
          placeholder="Descricao"
          onChangeText={setDescricao}
        />
      </div>

      <div className="mb-4 w-full">
        <label className="block text-sm font-medium text-gray-400" htmlFor="id">
          Status
        </label>
        <CampoTexto
          value={status}
          placeholder="ativo"
          onChangeText={setStatus}
        />
      </div>

      <Button
        onClick={handleSubmit}
        className={`${styles.perfil__button_salvar} w-1/4 self-end`}
      >
        Salvar
      </Button>
    </div>
  );
}
