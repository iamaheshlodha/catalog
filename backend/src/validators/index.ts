import Joi from 'joi';

export const createProductTypeSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(500).optional(),
});

export const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(200).required(),
  description: Joi.string().max(1000).optional(),
  productTypeId: Joi.string().uuid().required(),
  images: Joi.array().items(Joi.string().uri()).optional(),
});

export const createVariantSchema = Joi.object({
  sku: Joi.string().min(3).max(50).required(),
  size: Joi.string().max(50).optional(),
  color: Joi.string().max(50).optional(),
  price: Joi.number().positive().precision(2).required(),
  stock: Joi.number().integer().min(0).required(),
  productId: Joi.string().uuid().required(),
});

export const createAddOnSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(500).optional(),
  price: Joi.number().positive().precision(2).required(),
  productId: Joi.string().uuid().required(),
});
