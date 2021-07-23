import * as holdersOperations from '../controllers/updateAndDelete.controller';
import {Router} from 'express';
const router = Router();

router.get('/', (req, res) => res.json('Updating holders data :l'));
router.delete('/:email', holdersOperations.deleteHolder);
export default router;