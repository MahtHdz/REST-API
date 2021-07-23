import * as historyController from '../controllers/history.controller';
import {Router} from 'express';
const router = Router();

router.get('/', (req, res) => res.json('watching the transactions history ¬u¬'));

export default router;