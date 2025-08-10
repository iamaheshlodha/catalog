import { Router } from 'express';
import productTypeRoutes from './productTypeRoutes';
import productRoutes from './productRoutes';
import variantRoutes from './variantRoutes';
import addOnRoutes from './addOnRoutes';

const router = Router();

router.use('/product-types', productTypeRoutes);
router.use('/products', productRoutes);
router.use('/variants', variantRoutes);
router.use('/addons', addOnRoutes);

export default router;