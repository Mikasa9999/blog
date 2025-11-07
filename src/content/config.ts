import { defineCollection, z } from 'astro:content';

// Blog collection schema
const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    // Required fields
    title: z.string()
      .min(1, 'Title is required')
      .max(120, 'Title must be less than 120 characters'),

    description: z.string()
      .min(1, 'Description is required')
      .max(200, 'Description must be less than 200 characters'),

    pubDate: z.coerce.date(),

    category: z.enum(['theory', 'models', 'practice', 'tools', 'insights'])
      .describe('Article category'),

    // Optional fields
    updatedDate: z.coerce.date()
      .optional()
      .describe('Last update date'),

    heroImage: image()
      .refine((img) => img.width >= 400, {
        message: 'Hero image must be at least 400 pixels wide!',
      })
      .optional()
      .describe('Hero image for the article'),

    tags: z.array(z.string())
      .max(10, 'Maximum 10 tags allowed')
      .default([])
      .describe('Article tags'),

    draft: z.boolean()
      .default(false)
      .describe('Whether the article is a draft'),

    // SEO fields
    ogImage: z.string()
      .optional()
      .describe('Open Graph image URL'),

    canonicalUrl: z.string()
      .url()
      .optional()
      .describe('Canonical URL for SEO'),
  }),
});

// Category metadata
const categories = {
  theory: { title: '理论基础', description: 'AI/ML 基础理论和概念' },
  models: { title: '算法与模型', description: '机器学习算法和模型实现' },
  practice: { title: '实战与应用', description: '实际项目和应用案例' },
  tools: { title: '工具与框架', description: '开发工具和技术框架' },
  insights: { title: '思考与洞见', description: '技术思考和行业洞见' }
};

export { categories };
export const collections = { blog };