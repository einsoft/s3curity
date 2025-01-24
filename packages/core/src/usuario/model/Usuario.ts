export type UsuarioStatus = "ativo" | "inativo" | "pendente";
export type TipoAutenticacao = "senha" | "google" | "facebook" | "github";

export interface Usuario {
  id?: number;
  nomeCompleto: string;
  email: string;
  senha?: string;
  dataCriacao: Date;
  status?: UsuarioStatus;
  token?: string;
  dataExpiracaoToken?: Date;
  autenticacaoDoisFatoresAtiva?: boolean;
  telefone?: string;
  imagemPerfil?: string;
  perfis?: number[];
  tipoAutenticacao?: TipoAutenticacao;
  dataUltimaAtualizacao?: Date;
  dataUltimoLogin?: Date;
}
