import { Router } from 'express';
import {
  addArticle,
  addArticleFromFile,
  getCategories,
  classifyArticle
} from '../controllers/articleController';
import { validateRequest } from '../middleware/validateRequest';
import { ArticleSchema, FileUploadSchema } from '../types';

const router = Router();

// 获取所有分类
router.get('/categories', getCategories);

// 添加文章（直接内容）
router.post('/articles', validateRequest(ArticleSchema), addArticle);

// 从文件添加文章
router.post('/articles/from-file', validateRequest(FileUploadSchema), addArticleFromFile);

// 分类文章（不保存）
router.post('/articles/classify', validateRequest(ArticleSchema.pick({ title: true, content: true })), classifyArticle);

export { router as articleRoutes };