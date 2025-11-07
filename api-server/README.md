# 博客文章智能管理API

这是一个用于自动分类和管理博客文章的智能API服务，专为AI/ML知识博客设计。

## 功能特性

- 🤖 **智能文章分类** - 基于AI模型自动将文章分类到5个预设类别
- 📁 **文件自动处理** - 支持从本地文件路径自动解析和添加文章
- 🔍 **分类查询** - 提供所有可用分类的详细信息
- 📝 **Frontmatter生成** - 自动生成符合规范的YAML frontmatter
- 🛡️ **错误处理** - 完整的错误处理和验证机制
- 📊 **日志记录** - 详细的运行日志和性能监控

## 快速开始

### 1. 安装依赖

```bash
cd api-server
npm install
```

### 2. 配置环境变量

复制环境变量示例文件：

```bash
cp .env.example .env
```

编辑 `.env` 文件，配置必要的参数：

```env
# API服务器端口
PORT=3001

# HuggingFace API密钥（可选）
HUGGINGFACE_API_KEY=your_huggingface_api_key_here

# 内容存储基础路径
CONTENT_BASE_PATH=../src/content/blog
```

### 3. 启动服务

开发模式：
```bash
npm run dev
```

生产模式：
```bash
npm run build
npm start
```

服务将在 http://localhost:3001 启动

## API接口

### 获取所有分类

```http
GET /api/categories
```

响应示例：
```json
{
  "success": true,
  "data": [
    {
      "id": "theory",
      "name": "理论基础",
      "description": "AI/ML基础理论和概念"
    }
  ]
}
```

### 添加文章（直接内容）

```http
POST /api/articles
```

请求体：
```json
{
  "title": "文章标题",
  "content": "文章内容...",
  "description": "文章描述（可选）",
  "category": "theory", // 可选，不指定则自动分类
  "tags": ["标签1", "标签2"],
  "draft": false
}
```

### 从文件添加文章

```http
POST /api/articles/from-file
```

请求体：
```json
{
  "filePath": "/path/to/article.md",
  "category": "models", // 可选，不指定则自动分类
  "tags": ["标签1"],
  "draft": false
}
```

### 分类文章（不保存）

```http
POST /api/articles/classify
```

请求体：
```json
{
  "title": "文章标题",
  "content": "文章内容..."
}
```

响应示例：
```json
{
  "success": true,
  "data": {
    "category": "practice",
    "confidence": 0.85,
    "alternatives": [
      {"category": "models", "confidence": 0.12},
      {"category": "theory", "confidence": 0.03}
    ]
  }
}
```

## 分类系统

系统支持5个预设分类：

| 分类ID | 分类名称 | 描述 |
|--------|----------|------|
| theory | 理论基础 | AI/ML基础理论和概念 |
| models | 算法与模型 | 各种机器学习算法和模型 |
| practice | 实战与应用 | 实际应用和项目实践 |
| tools | 工具与框架 | 开发工具和框架使用 |
| insights | 思考与洞见 | 深度思考和行业见解 |

## AI分类机制

### 1. HuggingFace AI分类（推荐）
- 需要配置 `HUGGINGFACE_API_KEY`
- 使用零样本分类模型
- 准确率更高，支持复杂语义理解

### 2. 关键词分类（备用）
- 无需外部依赖
- 基于预设关键词匹配
- 适合简单分类场景

## 文件结构

添加的文章将保存到对应的分类目录：

```
src/content/blog/
├── theory/
│   └── article-slug.md
├── models/
│   └── another-article.md
├── practice/
├── tools/
└── insights/
```

## 健康检查

```http
GET /health
```

## 错误处理

所有API都返回标准化的响应格式：

```json
{
  "success": false,
  "error": "错误类型",
  "message": "详细错误信息"
}
```

## 开发

### 项目结构
```
src/
├── config/          # 配置管理
├── controllers/     # 控制器
├── middleware/      # 中间件
├── routes/         # 路由定义
├── services/       # 业务逻辑
├── types/          # TypeScript类型
└── utils/          # 工具函数
```

### 测试
```bash
npm test
```

## 部署

1. 构建项目：`npm run build`
2. 启动服务：`npm start`
3. 配置反向代理（如Nginx）
4. 设置进程管理（如PM2）

## 许可证

MIT License