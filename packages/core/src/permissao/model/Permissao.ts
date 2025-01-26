export default interface Permissao {
  id?: number;
  nome: string;
  descricao?: string;
  dataCadastro: Date;
  status?: "ativo" | "inativo";
}
