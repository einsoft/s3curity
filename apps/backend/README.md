## Estrutura de Dependências dos Módulos do Backend

[ResourceController]->[ResourceService]->[ResourceRepository]->[DatabaseService]

### Componentes da Arquitetura

1. **ResourceController**:

   - Local: `apps\backend\src\permissao\permissao.controller.ts`
   - Função: Recebe as requisições HTTP dos clientes.

2. **ResourceService**:

   - Local: `packages\core\src\permissao\service\AtualizarPermissao.ts`
   - Função: Implementa a lógica de negócio.

3. **ResourceRepository**:

   - Local: `apps\backend\src\permissao\permissao.prisma.ts`
   - Função: Implementa o repositório usando Prisma.
     - **Detalhamento**: O `ResourceRepository` é responsável por interagir com o banco de dados utilizando Prisma, que é uma ferramenta ORM (Object-Relational Mapping). O Prisma facilita a comunicação entre o código do aplicativo e o banco de dados, abstraindo as complexidades das operações de CRUD (Create, Read, Update, Delete). Assim, o `ResourceRepository` define métodos para criar, ler, atualizar e deletar dados específicos de permissão no banco de dados, além de executar consultas mais complexas se necessário.

4. **DatabaseService**:
   - Local: `apps\backend\src\permissao\permissao.module.ts`
   - Função: Gerencia a conexão com o banco de dados.

### Injeção de Dependências

- `ResourceRepository` é injetado via constructor no `ResourceService`.
- `DatabaseService` é injetado via constructor no `ResourceRepository`.
- `ResourceService` é injetado via constructor no `ResourceController`.

### Fluxo de Trabalho

1. O cliente faz uma requisição HTTP ao `ResourceController`.
2. O `ResourceController` chama o `ResourceService` para processar a requisição.
3. O `ResourceService` utiliza o `ResourceRepository` para acessar os dados necessários.
4. O `ResourceRepository` usa o `DatabaseService` para gerenciar a conexão com o banco de dados.

## Diagrama de Fluxo

```ascii
+------------------+       +----------------+       +------------------+       +---------------+
|ResourceController| ----> | ResourceService| ----> |ResourceRepository| ----> |DatabaseService|
+------------------+       +----------------+       +------------------+       +---------------+
        |                         |                         |
        v                         v                         v
[Requisições HTTP]         [Lógica de Negócio]       [Acesso ao Banco]
```

-

```plaintext
+----------------+       +------------------+       +-------------------+
|                |       |                  |       |                   |
|  HTTP Request  +-----> | ResourceController +-----> | ResourceService  |
|                |       |                  |       |                   |
+----------------+       +------------------+       +-------------------+
                                          |
                                          |
                                          v
                                   +------------------+
                                   | ResourceRepository |
                                   |                  |
                                   +------------------+
                                          |
                                          |
                                          v
                                   +------------------+
                                   | DatabaseService  |
                                   |                  |
                                   +------------------+
```

## Benefícios

Separação clara de responsabilidades  
Facilidade de testes unitários  
Baixo acoplamento entre camadas  
Flexibilidade para trocar implementações
