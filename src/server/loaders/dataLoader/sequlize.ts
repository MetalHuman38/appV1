// this will load all model classes found in files matching this glob pattern.
import { Sequelize, importModels } from '@sequelize/core';
import { MariaDbDialect } from '@sequelize/mariadb';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { databaseENV } from '../../config/databaseENV';

// ** Define __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

// ** Create a new instance of Sequelize
export const sequelize = new Sequelize({
  dialect: MariaDbDialect,
  host: databaseENV.DB_HOST,
  user: databaseENV.DB_USER,
  password: databaseENV.DB_PASS,
  database: databaseENV.DB_NAME,
  port: databaseENV.DB_PORT,
  ssl: databaseENV.DB_SSL,
  models: await importModels(
    __dirname + '/src/server/models/**/*.model.{ts,js}'
  ),
});

export default sequelize;
