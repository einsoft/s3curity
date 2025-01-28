import { Perfil } from "@s3curity/core";

export const perfis: Perfil[] = [
  {
    id: 1,
    nome: "Administrador",
    descricao: "Acesso total",
    dataCriacao: new Date(),
    status: "ativo",
  },
  {
    id: 2,
    nome: "Editor",
    descricao: "Pode editar conteúdos",
    dataCriacao: new Date(),
    status: "ativo",
  },
  {
    id: 3,
    nome: "Visualizador",
    descricao: "Somente leitura",
    dataCriacao: new Date(),
    status: "inativo",
  },
];
