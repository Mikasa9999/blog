import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import slugify from 'slugify';
import { Article } from '../types';
import { logger } from '../utils/logger';

export interface ParsedMarkdown {
  title?: string;
  description?: string;
  content: string;
  frontmatter?: Record<string, any>;
}

export async function parseMarkdownFile(filePath: string): Promise<ParsedMarkdown> {
  try {
    const absolutePath = path.resolve(filePath);
    const content = await fs.readFile(absolutePath, 'utf-8');

    // 使用gray-matter解析frontmatter
    const parsed = matter(content);

    // 从文件名提取标题（如果没有在frontmatter中指定）
    const fileName = path.basename(filePath, path.extname(filePath));
    const title = parsed.data.title || fileName;

    // 从内容生成描述（如果没有指定）
    const description = parsed.data.description ||
      generateDescription(parsed.content);

    return {
      title,
      description,
      content: parsed.content,
      frontmatter: parsed.data
    };
  } catch (error) {
    logger.error('Failed to parse markdown file', { filePath, error });
    throw new Error(`Failed to parse markdown file: ${error}`);
  }
}

function generateDescription(content: string): string {
  // 取前200个字符作为描述
  const plainText = content
    .replace(/[#*`]/g, '') // 移除markdown标记
    .replace(/\n+/g, ' ') // 合并换行
    .trim();

  return plainText.length > 200
    ? plainText.substring(0, 200) + '...'
    : plainText;
}

export function generateFrontmatter(article: Article): string {
  const frontmatter: Record<string, any> = {
    title: article.title,
    description: article.description || generateDescription(article.content),
    pubDate: new Date().toISOString(),
    category: article.category,
    tags: article.tags,
    draft: article.draft
  };

  // 清理undefined值
  Object.keys(frontmatter).forEach(key => {
    if (frontmatter[key] === undefined ||
        (Array.isArray(frontmatter[key]) && frontmatter[key].length === 0)) {
      delete frontmatter[key];
    }
  });

  // 转换为YAML格式
  const yamlContent = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
      } else if (typeof value === 'string') {
        return `${key}: "${value}"`;
      } else if (typeof value === 'boolean') {
        return `${key}: ${value}`;
      } else if (value instanceof Date) {
        return `${key}: ${value.toISOString()}`;
      } else {
        return `${key}: ${value}`;
      }
    })
    .join('\n');

  return `---\n${yamlContent}\n---\n\n`;
}

export function generateSlug(title: string): string {
  return slugify(title, {
    lower: true,
    strict: true,
    locale: 'zh'
  });
}