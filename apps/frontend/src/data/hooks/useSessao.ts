import { useContext } from "react";
import ContextoSessao from "../contexts/ContextoSessao";

const useSessao = () => useContext(ContextoSessao);

export default useSessao;
