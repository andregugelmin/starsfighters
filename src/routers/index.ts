import { Router } from 'express';
import battleRouter from './fightersRouter.js';

const router = Router();

router.use(battleRouter);

export default router;
