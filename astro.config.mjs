import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://light-knowledge-blog.vercel.app',
  integrations: [mdx(), tailwind(), sitemap()],

  // Markdown configuration
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  },

  // MDX configuration
  mdx: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark'
    }
  },

  // Build output
  build: {
    assets: '_astro'
  },

  // Vite configuration
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js']
    }
  }
});