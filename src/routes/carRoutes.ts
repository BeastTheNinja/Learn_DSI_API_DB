import { Router } from 'express';
import {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
} from '../controllers/carController.js';

const router = Router();

router.get('/', getRecords);
router.get('/:id', getRecord);
router.post('/', createRecord);
router.put('/:id', updateRecord);

export const carRoutes = router;
