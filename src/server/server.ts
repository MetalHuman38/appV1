import { Request, Response } from 'express';
const express = require('express');
const app = express();

const port = 8081;

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
