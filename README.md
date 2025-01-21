<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]

<!-- LOGO -->
<br />
<div align="center">
  <a href="https://github.com/einsoft/s3curity">
    <img src="apps/frontend/public/logo.svg" alt="Logo" width="160" height="160">
  </a>

<h3 align="center">S3curity</h3>

  <p align="center">
    Solução robusta de autenticação e autorização, incluindo o gerenciamento de Usuários, Perfis e Permissões.
    <br />
    <a href="https://github.com/einsoft/s3curity"><strong>Documentação »</strong></a>
    <br />
    <br />
    <a href="https://github.com/einsoft/s3curity">Demonstração</a>
    ·
    <a href="https://github.com/einsoft/s3curity/issues/new?labels=bug&template=bug-report---.md">Informar um bug</a>
    ·
    <a href="https://github.com/einsoft/s3curity/issues/new?labels=enhancement&template=feature-request---.md">Requisitar feature</a>
  </p>
</div>

<details>
  <summary>Conteúdo desse arquivo</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o Projeto</a>
      <ul>
        <li><a href="#feito-com">Feito com</a></li>
      </ul>
    </li>
    <li>
      <a href="#iniciando">Iniciando</a>
      <ul>
        <li><a href="#pr%C3%A9-requisitos">Pré-requisitos</a></li>
        <li><a href="#instala%C3%A7%C3%A3o">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#contribuindo">Contribuindo</a></li>
    <li><a href="#licen%C3%A7a">Licença</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

<!-- Sobre o Projeto -->

## Sobre o Projeto

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Solução robusta de autenticação e autorização, incluindo o gerenciamento de Usuários, Perfis e Permissões.

<p align="right">(<a href="#readme-top">voltar ao topo ^</a>)</p>

### Feito com

- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
- ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
- ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)

<p align="right">(<a href="#readme-top">voltar ao topo ^</a>)</p>

<!-- Iniciando -->

## Iniciando

Para executar localmente, siga os passos seguintes.

### Pré-requisitos

Antes de iniciar o desenvolvimento deste projeto, certifique-se de ter o seguinte software instalado em seu ambiente:

1. **Node.js**: Versão 14.x ou superior. Pode ser baixado e instalado a partir do [site oficial do Node.js](https://nodejs.org/).
2. **yarn**: Gerenciador de pacotes do Node.js.
3. **TypeScript**: Transpilador para JavaScript, instalado globalmente. Instale com o comando:
   ```sh
   npm install -g typescript
   ```
4. **Next.js**: Framework para React.js.
5. **React**: Biblioteca para construção de interfaces de usuário. Geralmente instalado como parte do Next.js.
6. **Prisma ORM**: Ferramenta para modelagem de dados e geração de consultas SQL. Instale com o comando:
   ```sh
   yarn add @prisma/client
   ```
7. **SQLite**: Banco de dados relacional leve. O Prisma geralmente lida com a instalação do SQLite, mas você pode precisar instalar bibliotecas adicionais dependendo do sistema operacional.
8. **NestJS**: Framework para construção de aplicativos Node.js robustos e escaláveis. Instale com o comando:
   ```sh
   npm install -g @nestjs/cli
   ```
9. **Git**: Sistema de controle de versão. Certifique-se de ter o Git instalado a partir do [site oficial do Git](https://git-scm.com/).

## Instalação

1. Clonar o repositório
   ```sh
   git clone https://github.com/einsoft/s3curity.git
   ```
2. Instalar os pacotes necessários, na raiz do projeto, execute:
   ```sh
   yarn
   ```
3. Na pasta apps/backend, renomear o arquivo `.env.exemplo` para `.env` e preencher as variáveis de ambiente
   ```js
   const JWT_SECRET = "ENTER YOUR API";
   ```

<p align="right">(<a href="#readme-top">voltar ao topo ^</a>)</p>

<!-- CONTRIBUTING -->

## Contribuindo

Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Quaisquer contribuições que você fizer serão **muito apreciadas**.

Se você tiver uma sugestão para melhorias, basta fazer um fork do repositório e crie um pull request. Você também pode simplesmente abrir uma issue com a tag "melhoria".

Não se esqueça de dar uma estrela ao projeto! Obrigado novamente!

1. Faça um fork
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Faça um commit de suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Envie para sua Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request <a href="https://github.com/einsoft/s3curity/wiki/Contribui%C3%A7%C3%A3o:-enviando-as-modifica%C3%A7%C3%B5es-para-o-projeto">nesse link</a>

<p align="right">(<a href="#readme-top">voltar ao topo ^</a>)</p>

### Top contributors:

<a href="https://github.com/einsoft/s3curity/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=einsoft/s3curity" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->

## Licença

Distribuído com a licença Unlicense. Consulte `LICENSE.txt` para mais informações.

<p align="right">(<a href="#readme-top">voltar ao topo ^</a>)</p>

<!-- Contato -->

## Contato

Projeto: [https://github.com/einsoft/s3curity](https://github.com/einsoft/s3curity)

<p align="right">(<a href="#readme-top">voltar ao topo ^</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/einsoft/s3curity.svg?style=for-the-badge
[contributors-url]: https://github.com/einsoft/s3curity/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/einsoft/s3curity.svg?style=for-the-badge
[forks-url]: https://github.com/einsoft/s3curity/network/members
[stars-shield]: https://img.shields.io/github/stars/einsoft/s3curity.svg?style=for-the-badge
[stars-url]: https://github.com/einsoft/s3curity/stargazers
[issues-shield]: https://img.shields.io/github/issues/einsoft/s3curity.svg?style=for-the-badge
[issues-url]: https://github.com/einsoft/s3curity/issues
[license-shield]: https://img.shields.io/badge/license-Unlicense-blue.svg
[license-url]: https://github.com/einsoft/s3curity/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: apps/frontend/public/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
