import express from 'express';
const router = express.Router();
import {
  getPromotion,
  getPromotionById,
  deletePromotion,
  createPromotion,
  updatePromotion,
  validatePromoCode,
} from '../controllers/promotionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';


router.route('/').get(getPromotion).post(protect, admin, createPromotion);
router
  .route('/:id')
  .get(getPromotionById)
  .delete(protect, admin, deletePromotion)
  .put(protect, admin, updatePromotion);
 
router.route('/:code').post(protect, admin, validatePromoCode);

 

export default router;
