import { Router } from 'express';
import { ProductTypeController } from '../controllers/productTypeController';
import { validate } from '../middleware/validation';
import { createProductTypeSchema } from '../validators';

const router = Router();
const productTypeController = new ProductTypeController();

router.post('/', validate(createProductTypeSchema), productTypeController.createProductType);
router.get('/', productTypeController.getAllProductTypes);
router.get('/:id', productTypeController.getProductTypeById);

export default router;