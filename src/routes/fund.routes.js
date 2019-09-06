import { Router } from 'express';

import { list } from '../controllers/fund.controller';

const router = Router();

router.get('/', list);

export default router;