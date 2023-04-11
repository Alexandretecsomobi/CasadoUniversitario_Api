-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "id_stripe" TEXT DEFAULT '',
    "nome" TEXT NOT NULL,
    "barbearia" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "assinante" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessao" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "assinante" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "iduser" TEXT,

    CONSTRAINT "sessao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cortes" (
    "id" TEXT NOT NULL,
    "iduser" TEXT,
    "corte" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cortes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientesatendidos" (
    "id" TEXT NOT NULL,
    "iduser" TEXT,
    "nome" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "valor" TEXT NOT NULL,
    "corte" TEXT NOT NULL,
    "isok" BOOLEAN DEFAULT false,

    CONSTRAINT "clientesatendidos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sessao_id_key" ON "sessao"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cortes_id_key" ON "cortes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "clientesatendidos_id_key" ON "clientesatendidos"("id");
