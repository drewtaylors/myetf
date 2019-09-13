import { Router } from 'express';

import {
  checkFundContainsStock
} from '../controllers/audit.controller';

const router = Router();

router.get('/:fund/:stock', checkFundContainsStock);

export default router;
