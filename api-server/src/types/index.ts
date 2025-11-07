import { z } from 'zod';

export const ArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  description: z.string().optional(),
  category: z.enum(['theory', 'models', 'practice', 'tools', 'insights']).optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  filePath: z.string().optional(),
});

export const FileUploadSchema = z.object({
  filePath: z.string().min(1, 'File path is required'),
  category: z.enum(['theory', 'models', 'practice', 'tools', 'insights']).optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

export type Article = z.infer<typeof ArticleSchema>;
export type FileUpload = z.infer<typeof FileUploadSchema>;

export interface ClassificationResult {
  category: Article['category'];
  confidence: number;
  alternatives: Array<{
    category: Article['category'];
    confidence: number;
  }>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}