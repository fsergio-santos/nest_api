# Guia de Referência Rápida: Prisma ORM

## 1. Fluxo de Trabalho & Comandos Essenciais

| Ação                         | Comando                                | Quando usar                                                                  |
| ---------------------------- | -------------------------------------- | ---------------------------------------------------------------------------- |
| **Formatar schema**          | `npx prisma format`                    | Sempre após alterar o `schema.prisma`.                                       |
| **Criar migração (Dev)**     | `npx prisma migrate dev --name <nome>` | Aplica mudanças no banco de dados local e regenera o client.                 |
| **Regenerar client**         | `npx prisma generate`                  | Quando atualizar modelos ou após clonar o repositório.                       |
| **Interface visual**         | `npx prisma studio`                    | Abre interface web (`localhost:5555`) para inspecionar e editar dados.       |
| **Sincronizar sem migração** | `npx prisma db push`                   | Ideal para prototipagem rápida ou bancos em nuvem sem histórico de migração. |
| **Aplicar migrações (Prod)** | `npx prisma migrate deploy`            | Em pipelines de CI/CD ou servidores de produção.                             |

---

## 2. Instanciação Única do Cliente (Singleton)

Evite múltiplas conexões ativas no ambiente de desenvolvimento:

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```
