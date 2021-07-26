import * as transactionsController from '../controllers/transactions.controller';
import {Router} from 'express';
const router = Router();

router.get('/hth', transactionsController.showHoldersTransactions);
router.post('/transfer', transactionsController.transferToAccount);
router.post('/deposit', transactionsController.depositToAccount);

export default router;