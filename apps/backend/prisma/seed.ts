import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const permissoesExistentes = await prisma.permissao.findMany({
    where: {
      nome: {
        in: ['Gerenciar Usuários', 'Gerenciar Perfis', 'Visualizar Relatórios'],
      },
    },
  });

  if (permissoesExistentes.length === 0) {
    await prisma.permissao.createMany({
      data: [
        {
          nome: 'Gerenciar Usuários',
          descricao: 'Permite criar, editar e remover usuários',
        },
        {
          nome: 'Gerenciar Perfis',
          descricao: 'Permite criar, editar e remover perfis',
        },
        {
          nome: 'Visualizar Relatórios',
          descricao: 'Permite visualizar relatórios do sistema',
        },
      ],
    });
  }

  console.log('Permissões básicas criadas com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
