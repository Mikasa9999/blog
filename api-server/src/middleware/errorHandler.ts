import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';
import { ApiResponse } from '../types';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error('Error occurred:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });

  const response: ApiResponse = {
    success: false,
    error: 'Internal server error'
  };

  // Zod验证错误
  if (error instanceof ZodError) {
    response.error = 'Validation failed';
    response.message = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    return res.status(400).json(response);
  }

  // 文件系统错误
  if (error.message.includes('ENOENT') || error.message.includes('no such file')) {
    response.error = 'File not found';
    response.message = 'The specified file does not exist';
    return res.status(404).json(response);
  }

  // 权限错误
  if (error.message.includes('EACCES') || error.message.includes('permission denied')) {
    response.error = 'Permission denied';
    response.message = 'Insufficient permissions to access the file';
    return res.status(403).json(response);
  }

  // 默认错误
  if (process.env.NODE_ENV === 'development') {
    response.message = error.message;
  }

  res.status(500).json(response);
}