export default interface Usuario {
  id?: number;
  nomeCompleto: string;
  email: string;
  senha?: string;
  dataCriacao: Date;
  status?: "ativo" | "inativo" | "pendente";
  token?: string;
  dataExpiracaoToken?: Date;
  autenticacaoDoisFatoresAtiva?: boolean;
  telefone?: string;
  imagemPerfil?: string;
  perfis?: number[];
  tipoAutenticacao?: "senha" | "google" | "facebook" | "github";
  dataUltimaAtualizacao?: Date;
  dataUltimoLogin?: Date;
}
