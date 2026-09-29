// src/config/typeorm.config.ts
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// Carrega variáveis do arquivo .env
config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres', // ou 'mysql'
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_DATABASE || 'mydb',

  // Caminho para encontrar todas as entidades automaticamente
  entities: [__dirname + '/../**/*.entity.{js,ts}'],

  // Caminho onde as migrations geradas serão salvas
  migrations: [__dirname + '/../migrations/*.{js,ts}'],

  // IMPORTANTE: Deixe sempre false ao usar migrations!
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
