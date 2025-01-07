export default interface ProvedorCriptografia {
  criptografar(senha: string): Promise<string>;
  comparar(senha: string, senhaCriptografada: string): Promise<boolean>;
}
