import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { validate } from '../middleware/validation';
import { createProductSchema } from '../validators';

const router = Router();
const productController = new ProductController();

router.post('/', validate(createProductSchema), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/type/:productTypeId', productController.getProductsByType);
router.get('/:id', productController.getProductById);

export default router;