import {Router} from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

router.get('/users', userController.getUsers);
export default router;