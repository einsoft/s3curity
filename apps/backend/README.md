# Arquitetura de Injeção de Dependências

## Estrutura de Dependências dos Módulos do Backend

[ResourceController]->[ResourceService]->[ResourceRepository]->[DatabaseService]

## Diagrama de Fluxo

```ascii
+------------------+       +----------------+       +------------------+       +---------------+
|ResourceController| ----> | ResourceService| ----> |ResourceRepository| ----> |DatabaseService|
+------------------+       +----------------+       +------------------+       +---------------+
        |                         |                         |
        v                         v                         v
[Requisições HTTP]         [Lógica de Negócio]       [Acesso ao Banco]
```

### Fluxo de Execução

O ResourceController recebe as requisições HTTP  
O ResourceService implementa a lógica de negócio  
O ResourceRepository implementa o repositório usando Prisma  
O DatabaseService gerencia a conexão com o banco

### Injeção de Dependências

ResourceRepository é injetado via constructor no ResourceService  
DatabaseService é injetado via constructor no ResourceRepository  
ResourceService é injetado via constructor no ResourceController  
Configuração feita no resource.module.ts usando useFactory

### Benefícios

Separação clara de responsabilidades  
Facilidade de testes unitários  
Baixo acoplamento entre camadas  
Flexibilidade para trocar implementações
