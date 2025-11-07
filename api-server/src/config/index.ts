import { z } from 'zod';

const ConfigSchema = z.object({
  port: z.number().default(3001),
  huggingfaceApiKey: z.string().optional(),
  contentBasePath: z.string().default('../src/content/blog'),
  allowedOrigins: z.array(z.string()).default(['http://localhost:4321', 'http://localhost:3000']),
  logLevel: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

export const config = ConfigSchema.parse({
  port: parseInt(process.env.PORT || '3001'),
  huggingfaceApiKey: process.env.HUGGINGFACE_API_KEY,
  contentBasePath: process.env.CONTENT_BASE_PATH || '../src/content/blog',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:4321,http://localhost:3000').split(','),
  logLevel: process.env.LOG_LEVEL as any || 'info',
});

export type Config = z.infer<typeof ConfigSchema>;