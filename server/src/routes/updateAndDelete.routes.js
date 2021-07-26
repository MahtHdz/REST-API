import * as holdersOperations from '../controllers/updateAndDelete.controller';
import {Router} from 'express';
const router = Router();

router.get('/', holdersOperations.showAll);
router.post('/email', holdersOperations.updateEmail);
router.post('/password', holdersOperations.updatePassword);
router.post('/bankAccount', holdersOperations.updateBankAccount);
router.delete('/:email', holdersOperations.deleteHolder);
export default router;