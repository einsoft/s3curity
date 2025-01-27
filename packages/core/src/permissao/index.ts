import Permissao from "./model/Permissao";
import RepositorioPermissao from "./provider/RepositorioPermissao";
import AtualizarPermissao from "./service/AtualizarPermissao";
import CadastrarPermissao from "./service/CadastrarPermissao";
import ExcluirPermissao from "./service/ExcluirPermissao";
import ListarPermissoes from "./service/ListarPermissoes";

export type { Permissao, RepositorioPermissao };
export {
  CadastrarPermissao,
  ListarPermissoes,
  AtualizarPermissao,
  ExcluirPermissao,
};
