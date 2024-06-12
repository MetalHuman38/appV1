import { Sequelize, importModels } from '@sequelize/core';
import { MariaDbDialect } from '@sequelize/mariadb';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const sequelize = new Sequelize({
  dialect: MariaDbDialect,
  // this will load all model classes found in files matching this glob pattern.
  models: await importModels(
    __dirname + '/src/server/models/**/*.model.{ts,js}',
  ),
});
