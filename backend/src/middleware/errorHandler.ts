import { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return res.status(409).json({
          success: false,
          message: 'Resource already exists',
          details: 'Unique constraint violation',
        });
      case 'P2025':
        return res.status(404).json({
          success: false,
          message: 'Resource not found',
        });
      default:
        return res.status(500).json({
          success: false,
          message: 'Database error',
        });
    }
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};