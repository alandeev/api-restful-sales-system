import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  res.json('OK');
});

export default routes;
