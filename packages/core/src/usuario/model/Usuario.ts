export default interface Usuario {
  id?: number;
  nomeCompleto: string;
  email: string;
  senha?: string;
  dataCriacao: Date;
  ativo?: boolean;
  token: string;
  dataExpiracaoToken: Date;
  autenticacaoDoisFatoresAtiva?: boolean;
  telefone?: string;
  imagemPerfil?: string;
}
