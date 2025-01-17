export default function FormAuth() {
  return (
    <div className="flex justify-center items-center h-screen">
      Formulário de Autenticação
      <div className="flex flex-col">
        <input type="text" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <button>Entrar</button>
      </div>
    </div>
  );
}
