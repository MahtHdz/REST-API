import * as transactionsController from '../controllers/transactions.controller';
import {Router} from 'express';
const router = Router();

router.get('/', (req, res) => res.json('making transactions =D'));

export default router;