import { Router } from 'express';

import {
  list,
  create,
  detail,
  update,
  remove
} from '../controllers/stock.controller';

const router = Router();

router.get('/', list);
router.post('/', create);
router.get('/:ticker', detail)
router.patch('/:ticker', update)
router.delete('/:ticker', remove)

export default router;
