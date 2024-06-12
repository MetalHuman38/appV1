import { Sequelize } from '@sequelize/core';
import { MariaDbDialect } from '@sequelize/mariadb';
import { databaseENV } from '../../config/databaseENV';
import fs from 'node:fs';

interface DBConfig {
  dialect: typeof MariaDbDialect;
  host: string;
  username: string;
  password: string;
  database: string;
  socketPath?: string;
  socketTimeout?: number;
  compress?: boolean;
  debug?: boolean;
  permitLocalInfile?: boolean;
  pipelining?: boolean;
  trace?: boolean;
  checkDuplicate?: boolean;
  initSqls?: string[];
  connectAttributes?: {
    [key: string]: string;
  };
  port?: number;
  ssl?: boolean;
  connectionTimeout?: number;
  dialectOptions?: {
    ssl?: {
      ca: string;
      key: string;
      cert: string;
    };
  };
}

const dbConfig: DBConfig = {
  dialect: MariaDbDialect,
  host: databaseENV.DB_HOST || 'localhost',
  username: databaseENV.DB_USER || 'metalbrain',
  password: databaseENV.DB_PASS || 'password',
  database: databaseENV.DB_NAME || 'FindSomeOne',
  socketPath: databaseENV.DB_SOCKET_PATH || '/var/run/mysqld/mysqld.sock',
  socketTimeout: databaseENV.DB_SOCKET_TIMEOUT || 1000,
  compress: databaseENV.DB_COMPRESS || false,
  debug: databaseENV.DB_DEBUG || false,
  permitLocalInfile: databaseENV.DB_PERMIT_LOCAL_INFILE || false,
  trace: databaseENV.DB_TRACE || true,
  checkDuplicate: databaseENV.DB_CHECK_DUPLICATE || false,
  connectAttributes: JSON.parse(databaseENV.DB_CONNECTION_ATTRIBUTES || '{}'),
  connectionTimeout: databaseENV.DB_CONNECTION_TIMEOUT || 1000,
  port: databaseENV.DB_PORT || 3306,
  ssl: databaseENV.DB_SSL || false,
  dialectOptions: {
    ssl: {
      ca: databaseENV.DB_SSL_CA
        ? fs.readFileSync(databaseENV.DB_SSL_CA).toString()
        : '',
      key: databaseENV.DB_SSL_KEY
        ? fs.readFileSync(databaseENV.DB_SSL_KEY).toString()
        : '',
      cert: databaseENV.DB_SSL_CERT
        ? fs.readFileSync(databaseENV.DB_SSL_CERT).toString()
        : '',
    },
  },
};

export function createSequelizeInstance(): Sequelize {
  // Create a new Sequelize instance
  const sequelize = new Sequelize({
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    socketPath: dbConfig.socketPath,
    socketTimeout: dbConfig.socketTimeout,
    compress: dbConfig.compress,
    debug: dbConfig.debug,
    permitLocalInfile: dbConfig.permitLocalInfile,
    trace: dbConfig.trace,
    showWarnings: dbConfig.debug,
    checkDuplicate: dbConfig.checkDuplicate,
    connectAttributes: dbConfig.connectAttributes,
    port: dbConfig.port,
    ssl: dbConfig.ssl,
    connectTimeout: dbConfig.connectionTimeout,
  });
  return sequelize;
}

export default { createSequelizeInstance };
