import { Router } from 'express';
import { AddOnController } from '../controllers/addOnController';
import { validate } from '../middleware/validation';
import { createAddOnSchema } from '../validators';

const router = Router();
const addOnController = new AddOnController();

router.post('/', validate(createAddOnSchema), addOnController.createAddOn);
router.get('/product/:productId', addOnController.getAddOnsByProduct);

export default router;