# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal AI/ML knowledge blog website built with Astro + TailwindCSS + MDX. The project structure follows a knowledge-base blog format with five main sections:
- theory (理论基础)
- models (算法与模型)
- practice (实战与应用)
- tools (工具与框架)
- insights (思考与洞见)

## Architecture

- **Framework**: Astro with MDX support for content
- **Styling**: TailwindCSS with custom blue-gray color scheme
- **Content**: Markdown files with YAML frontmatter organized by section
- **Search**: Pagefind for full-site search functionality
- **Features**: Code highlighting, math formulas, dark mode, search

## Common Development Tasks

### Setup and Development
```bash
npm install
npm run dev
```

### Build and Production
```bash
npm run build
npm run preview
```

### Search Indexing
```bash
npm run pagefind
```

## Content Structure

- Content is organized in `/src/content/` by section folders
- Each section contains `.md`/`.mdx` files with YAML frontmatter
- Homepage displays section introductions and recent articles
- Search functionality indexes all content automatically

## Deployment

- Configured for Vercel deployment
- Build command: `npm run build`
- Output directory: `dist`