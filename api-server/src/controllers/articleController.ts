import { Request, Response, NextFunction } from 'express';
import { Article, FileUpload, ApiResponse, ClassificationResult } from '../types';
import { logger } from '../utils/logger';
import { classifyArticleWithAI } from '../services/classificationService';
import { parseMarkdownFile, generateFrontmatter } from '../services/fileParser';
import { saveArticleToFile } from '../services/fileManager';

export async function getCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = [
      { id: 'theory', name: '理论基础', description: 'AI/ML基础理论和概念' },
      { id: 'models', name: '算法与模型', description: '各种机器学习算法和模型' },
      { id: 'practice', name: '实战与应用', description: '实际应用和项目实践' },
      { id: 'tools', name: '工具与框架', description: '开发工具和框架使用' },
      { id: 'insights', name: '思考与洞见', description: '深度思考和行业见解' }
    ];

    const response: ApiResponse = {
      success: true,
      data: categories
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

export async function addArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const article: Article = req.body;

    // 如果没有指定分类，使用AI自动分类
    let category = article.category;
    if (!category) {
      const classification = await classifyArticleWithAI(article.title, article.content);
      category = classification.category;
      logger.info(`Auto-classified article as: ${category} (confidence: ${classification.confidence})`);
    }

    // 生成frontmatter并保存文件
    const result = await saveArticleToFile({
      ...article,
      category: category!
    });

    const response: ApiResponse = {
      success: true,
      data: {
        ...result,
        category,
        message: 'Article added successfully'
      }
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

export async function addArticleFromFile(req: Request, res: Response, next: NextFunction) {
  try {
    const fileUpload: FileUpload = req.body;

    // 解析markdown文件
    const parsedContent = await parseMarkdownFile(fileUpload.filePath);

    // 如果没有指定分类，使用AI自动分类
    let category = fileUpload.category;
    if (!category) {
      const classification = await classifyArticleWithAI(
        parsedContent.title || 'Untitled',
        parsedContent.content
      );
      category = classification.category;
      logger.info(`Auto-classified file as: ${category} (confidence: ${classification.confidence})`);
    }

    // 生成frontmatter并保存文件
    const result = await saveArticleToFile({
      title: parsedContent.title || 'Untitled',
      content: parsedContent.content,
      description: parsedContent.description,
      category: category!,
      tags: fileUpload.tags,
      draft: fileUpload.draft
    });

    const response: ApiResponse = {
      success: true,
      data: {
        ...result,
        category,
        message: 'Article added from file successfully'
      }
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

export async function classifyArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, content } = req.body;

    const classification: ClassificationResult = await classifyArticleWithAI(title, content);

    const response: ApiResponse = {
      success: true,
      data: classification
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}