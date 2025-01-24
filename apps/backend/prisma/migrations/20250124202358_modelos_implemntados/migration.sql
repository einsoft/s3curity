-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "token" TEXT,
    "dataExpiracaoToken" DATETIME,
    "autenticacaoDoisFatoresAtiva" BOOLEAN NOT NULL DEFAULT false,
    "telefone" TEXT,
    "imagemPerfil" TEXT,
    "tipoAutenticacao" TEXT DEFAULT 'senha',
    "dataUltimaAtualizacao" DATETIME,
    "dataUltimoLogin" DATETIME
);

-- CreateTable
CREATE TABLE "perfis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'ativo'
);

-- CreateTable
CREATE TABLE "permissoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "dataCadastro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'ativo'
);

-- CreateTable
CREATE TABLE "_PerfilPermissoes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PerfilPermissoes_A_fkey" FOREIGN KEY ("A") REFERENCES "perfis" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PerfilPermissoes_B_fkey" FOREIGN KEY ("B") REFERENCES "permissoes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_UsuarioPerfis" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UsuarioPerfis_A_fkey" FOREIGN KEY ("A") REFERENCES "perfis" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UsuarioPerfis_B_fkey" FOREIGN KEY ("B") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PerfilPermissoes_AB_unique" ON "_PerfilPermissoes"("A", "B");

-- CreateIndex
CREATE INDEX "_PerfilPermissoes_B_index" ON "_PerfilPermissoes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UsuarioPerfis_AB_unique" ON "_UsuarioPerfis"("A", "B");

-- CreateIndex
CREATE INDEX "_UsuarioPerfis_B_index" ON "_UsuarioPerfis"("B");
