-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "token" TEXT NOT NULL,
    "dataExpiracaoToken" DATETIME NOT NULL,
    "qutenticacaoDoisFatoresAtiva" BOOLEAN NOT NULL DEFAULT false,
    "telefone" TEXT NOT NULL,
    "imagemPerfil" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
