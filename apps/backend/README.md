# Arquitetura de Injeção de Dependências

## Estrutura de Dependências

[PerfilController] -> [ListarPerfis] -> [PerfilPrisma] -> [PrismaService]

## Diagrama de Fluxo

```ascii
+-----------------+       +----------------+       +-----------------+       +---------------+
| PerfilController| ----> |  ListarPerfis  | ----> |  PerfilPrisma   | ----> | PrismaService |
+-----------------+       +----------------+       +-----------------+       +---------------+
        |                         |                         |
        v                         v                         v
[Requisições HTTP]         [Lógica de Negócio]       [Acesso ao Banco]
Fluxo de Execução
O PerfilController recebe as requisições HTTP
O ListarPerfis implementa a lógica de negócio
O PerfilPrisma implementa o repositório usando Prisma
O PrismaService gerencia a conexão com o banco
Injeção de Dependências
PerfilPrisma é injetado via constructor no ListarPerfis
PrismaService é injetado via constructor no PerfilPrisma
ListarPerfis é injetado via constructor no PerfilController
Configuração feita no perfil.module.ts usando useFactory
Benefícios
Separação clara de responsabilidades
Facilidade de testes unitários
Baixo acoplamento entre camadas
Flexibilidade para trocar implementações
```
