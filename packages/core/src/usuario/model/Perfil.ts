export default interface Perfil {
  id?: number;
  nome: string;
  descricao?: string;
  dataCriacao: Date;
  status?: "ativo" | "inativo";
  permissoes?: number[];
}
