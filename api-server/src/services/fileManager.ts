import fs from 'fs/promises';
import path from 'path';
import { Article } from '../types';
import { config } from '../config';
import { logger } from '../utils/logger';
import { generateFrontmatter, generateSlug } from './fileParser';

export interface SaveResult {
  filePath: string;
  fileName: string;
  category: string;
  slug: string;
  url: string;
}

export async function saveArticleToFile(article: Article): Promise<SaveResult> {
  try {
    // 确保内容目录存在
    const contentBasePath = path.resolve(config.contentBasePath);
    const categoryPath = path.join(contentBasePath, article.category);

    await ensureDirectoryExists(categoryPath);

    // 生成文件名和路径
    const slug = generateSlug(article.title);
    const fileName = `${slug}.md`;
    const filePath = path.join(categoryPath, fileName);

    // 检查文件是否已存在
    if (await fileExists(filePath)) {
      // 如果文件已存在，添加时间戳
      const timestamp = Date.now();
      const uniqueFileName = `${slug}-${timestamp}.md`;
      const uniqueFilePath = path.join(categoryPath, uniqueFileName);

      logger.warn(`File already exists, creating with unique name: ${uniqueFileName}`);

      return await writeArticleToFile(article, uniqueFilePath, uniqueFileName, article.category);
    }

    return await writeArticleToFile(article, filePath, fileName, article.category);
  } catch (error) {
    logger.error('Failed to save article to file', { error, article: { title: article.title, category: article.category } });
    throw new Error(`Failed to save article: ${error}`);
  }
}

async function writeArticleToFile(
  article: Article,
  filePath: string,
  fileName: string,
  category: string
): Promise<SaveResult> {
  // 生成frontmatter
  const frontmatter = generateFrontmatter(article);

  // 组合完整内容
  const fullContent = frontmatter + article.content;

  // 写入文件
  await fs.writeFile(filePath, fullContent, 'utf-8');

  logger.info('Article saved successfully', {
    filePath,
    category,
    title: article.title
  });

  // 生成URL（基于Astro的路由结构）
  const slug = path.basename(fileName, '.md');
  const url = `/${category}/${slug}/`;

  return {
    filePath,
    fileName,
    category,
    slug,
    url
  };
}

async function ensureDirectoryExists(dirPath: string): Promise<void> {
  try {
    await fs.access(dirPath);
  } catch (error) {
    // 目录不存在，创建它
    await fs.mkdir(dirPath, { recursive: true });
    logger.info(`Created directory: ${dirPath}`);
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// 获取目录中的文章列表
export async function getArticlesInCategory(category: string): Promise<string[]> {
  try {
    const categoryPath = path.resolve(config.contentBasePath, category);

    if (!(await fileExists(categoryPath))) {
      return [];
    }

    const files = await fs.readdir(categoryPath);
    return files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
  } catch (error) {
    logger.error('Failed to get articles in category', { category, error });
    return [];
  }
}