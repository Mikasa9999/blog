---
title: "MySQL 表的键（Key）知识点"
description: "MySQL 表的键（Key）知识点"
pubDate: 2024-10-03
category: "theory"
tags: ["mysql"]
draft: false
---

# MySQL 表的键（Key）知识点

## 概述

MySQL 中的"键"用于约束数据唯一性和加速查询，主要有以下几种类型：

- **主键（PRIMARY KEY）**
- **唯一键（UNIQUE KEY）**  
- **非唯一索引（INDEX / KEY）**

## 主键（PRIMARY KEY）

### 特性
- 每张表只能有一个主键
- 字段值必须唯一
- 不允许为 NULL
- MySQL 会自动为主键创建索引加速查询

### 语法示例
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50)
);
```

## 唯一键（UNIQUE KEY）

### 特性
- 一个表可以有多个唯一键
- 字段值必须唯一
- 允许为 NULL（多个 NULL 值不视为冲突）
- 可用于单列或多列组合

### 单列唯一键示例
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE
);
```

### 多列唯一键示例
保证同一个顾客不能购买同一个产品多次：
```sql
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT,
    product_id INT,
    customer_id INT,
    UNIQUE KEY uniq_product_customer (product_id, customer_id)
);
```

## 非唯一索引（INDEX / KEY）

### 特性
- 字段值可以重复
- 主要用于加速查询
- 不限制重复值
- 一个表可以有多个非唯一索引

### 示例
```sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    status VARCHAR(20),
    INDEX idx_user(user_id),
    INDEX idx_status(status)
);
```

## 性能优化

使用非唯一索引后，查询 `WHERE user_id = 5` 会更快，但 `user_id` 字段仍然可以包含重复值。

## 总结

| 键类型 | 数量限制 | 唯一性 | 允许NULL | 主要用途 |
|--------|----------|--------|----------|----------|
| 主键 | 每表1个 | 是 | 否 | 标识唯一记录 |
| 唯一键 | 多个 | 是 | 是 | 保证数据唯一性 |
| 非唯一索引 | 多个 | 否 | 是 | 加速查询 |