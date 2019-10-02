import { Router } from 'express';

import {
  list,
  create,
  detail,
  update,
  remove
} from '../controllers/record.controller';

const router = Router();

router.get('/', list);
router.post('/', create);
router.get('/:id', detail)
router.patch('/:id', update)
router.delete('/:id', remove)

export default router;
