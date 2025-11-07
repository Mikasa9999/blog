import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
import { logger } from './utils/logger';
import { articleRoutes } from './routes/articles';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// 安全中间件
app.use(helmet());
app.use(cors({
  origin: config.allowedOrigins,
  credentials: true,
}));

// 解析JSON请求体
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'blog-article-agent'
  });
});

// API路由
app.use('/api', articleRoutes);

// 错误处理中间件
app.use(errorHandler);

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

const server = app.listen(config.port, () => {
  logger.info(`🚀 Blog Article Agent API server running on port ${config.port}`);
  logger.info(`📝 Content base path: ${config.contentBasePath}`);
  logger.info(`🔗 Health check: http://localhost:${config.port}/health`);
});

// 优雅关闭
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
  });
});

export default app;