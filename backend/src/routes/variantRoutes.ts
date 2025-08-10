import { Router } from 'express';
import { VariantController } from '../controllers/variantController';
import { validate } from '../middleware/validation';
import { createVariantSchema } from '../validators';

const router = Router();
const variantController = new VariantController();

router.post('/', validate(createVariantSchema), variantController.createVariant);
router.get('/product/:productId', variantController.getVariantsByProduct);
router.patch('/:id/stock', variantController.updateVariantStock);

export default router;