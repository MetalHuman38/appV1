import express from 'express';
import cors from 'cors';
import { env } from '../config/index';
import { corOptions } from '../config/corOptions';
import { getAllData } from '../models/testdb';
import { getAllColumns } from '../models/testdb';

const router = express.Router();

router.use(cors(corOptions));

router.get('/', (_req, res) => {
  res.send({
    status: `${env.NODE_ENV}`,
    message: `${env.RESPONSE_STATUS}`,
    name: `${env.APP_NAME}`,
  });
});

router.get('/api/tables', async (_req, res) => {
  try {
    const columns = await getAllColumns('userRegistration');
    res.send({
      tables: columns,
    });
  } catch (error) {
    // Handle the error here
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/api/data', async (_req, res) => {
  try {
    const data = await getAllData();
    res.send({
      data: data,
    });
  } catch (error) {
    // Handle the error here
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { router };
