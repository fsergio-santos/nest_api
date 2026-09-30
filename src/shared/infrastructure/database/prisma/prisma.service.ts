import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });

    super({ adapter });

    const TARGET_FIELD = 'deletedAt';

    // 1. Descobre dinamicamente os nomes dos modelos que contêm o campo TARGET_FIELD
    const softDeleteModelNames = new Set(
      Prisma.dmmf.datamodel.models
        .filter((model) => model.fields.some((field) => field.name === TARGET_FIELD))
        .map((model) => model.name),
    );

    // 2. Extensão nativa do Prisma que intercepta as operações apenas para esses modelos
    const extendedClient = this.$extends({
      query: {
        $allModels: {
          // Intercepta findFirst / findMany / findUnique para filtrar registros deletados
          async findFirst({ model, args, query }) {
            if (softDeleteModelNames.has(model)) {
              args.where = { ...args.where, [TARGET_FIELD]: null };
            }
            return await query(args);
          },

          async findMany({ model, args, query }) {
            if (softDeleteModelNames.has(model)) {
              args.where = { ...args.where, [TARGET_FIELD]: null };
            }
            return await query(args);
          },

          async findUnique({ model, args }) {
            if (softDeleteModelNames.has(model)) {
              // findUnique exige campos únicos; transformamos em findFirst para aceitar deletedAt: null
              return await (this as any)[model].findFirst({
                where: { ...args.where, [TARGET_FIELD]: null },
              });
            }
            return await (this as any)[model].findUnique(args);
          },

          // Transforma delete em soft delete (update com timestamp)
          async delete({ model, args }) {
            if (softDeleteModelNames.has(model)) {
              return await (this as any)[model].update({
                where: args.where,
                data: { [TARGET_FIELD]: new Date() },
              });
            }
            return await (this as any)[model].delete(args);
          },

          // Transforma deleteMany em soft delete em lote
          async deleteMany({ model, args }) {
            if (softDeleteModelNames.has(model)) {
              return await (this as any)[model].updateMany({
                where: args.where,
                data: { [TARGET_FIELD]: new Date() },
              });
            }
            return await (this as any)[model].deleteMany(args);
          },
        },
      },
    });

    // 3. Aplica o cliente estendido na instância atual
    return extendedClient as any;
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
