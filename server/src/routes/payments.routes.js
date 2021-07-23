import {Router} from 'express';
const router = Router();

router.get('/', (req, res) => res.json('making payments'));

export default router;