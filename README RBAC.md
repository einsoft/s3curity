# README RBAC

## Associação de Perfil ao Usuário

O modelo `Usuario` possui um campo `perfis` que é uma relação many-to-many com o modelo `Perfil` através da relação `@relation("UsuarioPerfis")`.

- **Modelo `Usuario`**:

  ```prisma
  model Usuario {
    id      Int      @id @default(autoincrement())
    nome    String
    email   String   @unique
    perfis  Perfil[] @relation("UsuarioPerfis")
  }
  ```

- **Modelo `Perfil`**:
  ```prisma
  model Perfil {
    id       Int       @id @default(autoincrement())
    nome     String
    usuarios Usuario[] @relation("UsuarioPerfis")
  }
  ```

Isso permite que um usuário tenha múltiplos perfis e um perfil possa ser associado a múltiplos usuários.

## Associação de Permissão ao Perfil

O modelo `Perfil` possui um campo `permissoes` que é uma relação many-to-many com o modelo `Permissao` através da relação `@relation("PerfilPermissoes")`.

- **Modelo `Perfil`**:

  ```prisma
  model Perfil {
    id          Int         @id @default(autoincrement())
    nome        String
    permissoes  Permissao[] @relation("PerfilPermissoes")
  }
  ```

- **Modelo `Permissao`**:
  ```prisma
  model Permissao {
    id      Int      @id @default(autoincrement())
    nome    String
    perfis  Perfil[] @relation("PerfilPermissoes")
  }
  ```

Isso permite que um perfil tenha múltiplas permissões e uma permissão possa ser associada a múltiplos perfis.

---

### Resumo

- **Associação de Perfil ao Usuário**:

  - Um usuário pode ter múltiplos perfis.
  - Um perfil pode ser associado a múltiplos usuários.

- **Associação de Permissão ao Perfil**:
  - Um perfil pode ter múltiplas permissões.
  - Uma permissão pode ser associada a múltiplos perfis.

Essa estrutura de relacionamento many-to-many permite uma flexibilidade maior na gestão de usuários, perfis e permissões, facilitando a implementação de um sistema de controle de acesso baseado em funções (RBAC).
