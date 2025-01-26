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
    <a href="https://github.com/einsoft/s3curity/wiki"><strong>Documentação »</strong></a>
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

[![S3curity Screen Shot][product-screenshot]](https://s3curity-web.vercel.app)

**S3curity** é uma solução robusta de autenticação e autorização projetada para garantir segurança, flexibilidade e eficiência no gerenciamento de usuários, perfis e permissões.

### Principais Funcionalidades

- ✅ Autenticação segura com JWT
- ✅ Gerenciamento de usuários e perfis
- ✅ Controle de permissões granular
- ✅ API RESTful documentada
- ✅ Interface web moderna e responsiva
- ✅ Integração com múltiplos provedores de autenticação
- ✅ Suporte a multi-tenant

### Arquitetura

O sistema foi desenvolvido seguindo os princípios de Clean Architecture e Domain-Driven Design (DDD), com:

- **Frontend**: Next.js com TypeScript
- **Backend**: NestJS com Prisma ORM
- **Banco de Dados**: SQLite (com suporte para outros SGBDs)
- **Autenticação**: JWT com refresh tokens
- **Testes**: Jest e Cypress

[![Arquitetura][architecture-diagram]](https://github.com/einsoft/s3curity/wiki/Arquitetura)

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

## 🚀 Iniciando

Para executar localmente, siga os passos abaixo:

### Pré-requisitos

- [ ] **Node.js** v14.x ou superior ([instalar](https://nodejs.org/))
- [ ] **Yarn** v1.22.x ou superior
- [ ] **Docker** (opcional para desenvolvimento com containers)
- [ ] **Git** ([instalar](https://git-scm.com/))

### Instalação

1. Clonar o repositório

   ```sh
   git clone https://github.com/einsoft/s3curity.git
   cd s3curity
   ```

2. Instalar dependências

   ```sh
   yarn install
   ```

3. Configurar ambiente

   ```sh
   cp apps/backend/.env.exemplo apps/backend/.env
   # Editar o arquivo .env com suas credenciais
   ```

4. Configurar banco de dados

   ```sh
   cd apps/backend
   npx prisma migrate dev
   npx prisma generate
   ```

5. Iniciar aplicação
   ```sh
   yarn dev
   ```

### 🛠️ Desenvolvimento

| Comando                            | Descrição                    |
| ---------------------------------- | ---------------------------- |
| `yarn dev`                         | Inicia frontend e backend    |
| `yarn workspace frontend dev`      | Inicia apenas o frontend     |
| `yarn workspace backend start:dev` | Inicia apenas o backend      |
| `yarn test`                        | Executa todos os testes      |
| `yarn lint`                        | Verifica estilo de código    |
| `yarn build`                       | Gera build de produção       |
| `yarn clean`                       | Limpa cache e builds antigos |

### 🗂️ Estrutura do Projeto

```bash
s3curity/
├── apps/
│   ├── frontend/          # Aplicação Next.js
│   └── backend/           # API NestJS
├── packages/
│   ├── core/              # Lógica de negócio compartilhada
│   ├── ui/                # Componentes UI compartilhados
│   ├── eslint-config/     # Configurações ESLint
│   └── typescript-config/ # Configurações TypeScript
```

### 📚 Documentação

- [Guia de Contribuição](https://github.com/einsoft/s3curity/wiki/Contribui%C3%A7%C3%A3o)
- [Documentação da API](https://github.com/einsoft/s3curity/wiki/API-Documentation)
- [Guia de Estilo](https://github.com/einsoft/s3curity/wiki/Style-Guide)

### Documentação da API

A documentação da API está disponível em:

- Swagger UI: `http://localhost:4000/api`
- OpenAPI JSON: `http://localhost:4000/api-json`

### 🚨 Resolução de Problemas

#### Erro de conexão com banco de dados

- [ ] Verifique se o banco de dados SQLite foi gerado corretamente na pasta: src/apps/backend/prisma/dev.db
- [ ] Confirme as credenciais no arquivo .env

#### Erro de build

- [ ] Limpe a cache: `yarn clean`
- [ ] Reinstale as dependências: `yarn install`

#### Erro de tipagem

- [ ] Regenere os tipos do Prisma: `npx prisma generate`
- [ ] Verifique se todas as dependências estão instaladas

#### Outros problemas

Consulte nosso [guia de troubleshooting](https://github.com/einsoft/s3curity/wiki/Troubleshooting) para mais informações.

<p align="right">(<a href="#readme-top">voltar ao topo ^</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estes passos:

1. Faça um fork do projeto
2. Crie sua branch (`git checkout -b feature/NovaFeature`)
3. Faça commit das mudanças (`git commit -m 'Adiciona NovaFeature'`)
4. Envie para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

Antes de contribuir, leia nosso [guia de contribuição](https://github.com/einsoft/s3curity/wiki/Contribuicao).

### Boas práticas

- [ ] Siga o guia de estilo de código
- [ ] Escreva testes para novas funcionalidades
- [ ] Mantenha commits atômicos e bem descritos
- [ ] Documente novas funcionalidades

<p align="right">(<a href="#readme-top">voltar ao topo ^</a>)</p>

### Top contributors:

<a href="https://github.com/einsoft/s3curity/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=einsoft/s3curity" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->

## 📄 Licença

Este projeto está licenciado sob a licença Unlicense - veja o arquivo [LICENSE.txt](LICENSE.txt) para mais detalhes.

## 🚧 Roadmap

- [ ] Suporte a autenticação OAuth
- [ ] Integração com provedores de identidade (Google, GitHub, etc.)
- [ ] Dashboard administrativo
- [ ] Documentação completa da API

Veja nosso [roadmap completo](https://github.com/einsoft/s3curity/wiki/Roadmap) para mais detalhes.

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
[architecture-diagram]: apps/frontend/public/architecture.png
[ci-badge]: https://github.com/einsoft/s3curity/actions/workflows/ci.yml/badge.svg
[ci-url]: https://github.com/einsoft/s3curity/actions
[cov-badge]: https://codecov.io/gh/einsoft/s3curity/branch/main/graph/badge.svg
[cov-url]: https://codecov.io/gh/einsoft/s3curity
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
