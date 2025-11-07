# AI/ML 知识博客

基于 Astro + TailwindCSS + MDX 构建的个人 AI/机器学习知识博客网站。

## 功能特性

- 🎨 现代化设计，支持深色模式
- 📚 五个知识栏目：理论基础、算法与模型、实战与应用、工具与框架、思考与洞见
- 🔍 全站搜索功能（基于 Pagefind）
- 📱 响应式设计，移动端友好
- 🚀 基于 Astro 构建，性能优异
- 📝 支持 Markdown/MDX 内容

## 项目结构

```
src/
├── components/          # 可复用组件
├── content/            # 内容文件
│   ├── theory/        # 理论基础
│   ├── models/        # 算法与模型
│   ├── practice/      # 实战与应用
│   ├── tools/         # 工具与框架
│   └── insights/      # 思考与洞见
├── layouts/           # 页面布局
├── pages/             # 页面路由
└── styles/            # 样式文件
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 生成搜索索引

```bash
npm run pagefind
```

## 添加内容

在对应的栏目目录下创建 `.md` 或 `.mdx` 文件，使用以下 frontmatter 格式：

```yaml
---
title: "文章标题"
description: "文章描述"
pubDate: 2024-01-01
updatedDate: 2024-01-02  # 可选
heroImage: "/images/hero.jpg"  # 可选
category: "models"  # theory|models|practice|tools|insights
tags: ["tag1", "tag2"]
draft: false  # 可选，默认为 false
---
```

## 部署到 Vercel

1. 将代码推送到 GitHub 仓库
2. 在 Vercel 中导入项目
3. 构建命令：`npm run build`
4. 输出目录：`dist`

项目已配置 `vercel.json`，Vercel 会自动识别为 Astro 项目。

## 技术栈

- [Astro](https://astro.build/) - 现代静态站点生成器
- [TailwindCSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [MDX](https://mdxjs.com/) - Markdown + JSX
- [Pagefind](https://pagefind.app/) - 静态站点搜索
- [TypeScript](https://www.typescriptlang.org/) - 类型安全

## 许可证

MIT