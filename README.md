# light的知识博客

一个轻量级的知识博客，使用 Astro + TailwindCSS + MDX 构建。

## 🚀 特性

- ⚡️ **快速构建** - 基于 Astro 的静态站点生成
- 🎨 **现代设计** - 使用 TailwindCSS 的简洁设计
- 📝 **内容友好** - 支持 MDX 和 Markdown
- 🌙 **深色模式** - 完整的深色/浅色模式支持
- 🔍 **全文搜索** - 集成 Pagefind 搜索
- 📱 **响应式** - 移动端友好的响应式设计
- 🎯 **SEO 优化** - 自动生成 sitemap 和 meta 标签
- 📚 **数学公式** - 支持 LaTeX 数学公式渲染

## 🛠️ 技术栈

- [Astro](https://astro.build/) - 静态站点生成器
- [TailwindCSS](https://tailwindcss.com/) - CSS 框架
- [MDX](https://mdxjs.com/) - Markdown + JSX
- [Pagefind](https://pagefind.app/) - 全文搜索
- [KaTeX](https://katex.org/) - 数学公式渲染

## 📦 项目结构

```
├── src/
│   ├── components/     # 可复用组件
│   ├── content/        # 内容集合
│   ├── layouts/        # 页面布局
│   ├── pages/          # 页面路由
│   └── styles/         # 全局样式
├── public/             # 静态资源
└── dist/              # 构建输出
```

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:4321

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📝 内容管理

### 添加新文章

1. 在 `src/content/blog/` 目录下创建新的 `.md` 或 `.mdx` 文件
2. 使用以下 frontmatter 格式：

```yaml
---
title: "文章标题"
description: "文章描述"
pubDate: 2024-01-01
category: "theory" # theory, models, practice, tools, insights
tags: ["标签1", "标签2"]
draft: false
---
```

### 分类说明

- `theory` - 理论基础
- `models` - 算法与模型
- `practice` - 实战与应用
- `tools` - 工具与框架
- `insights` - 思考与洞见

## 🎨 自定义

### 颜色主题

编辑 `tailwind.config.js` 中的颜色配置：

```javascript
colors: {
  primary: { /* 主色调 */ },
  accent: { /* 强调色 */ }
}
```

### 字体

在 `tailwind.config.js` 中配置字体：

```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace']
}
```

## 📖 部署

### Vercel (推荐)

1. Fork 此仓库
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 部署完成

### 其他平台

项目支持部署到任何支持静态站点的平台：

- Netlify
- GitHub Pages
- Cloudflare Pages
- 其他静态托管服务

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件