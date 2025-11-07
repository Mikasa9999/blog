---
title: "Adam与AdamW 的系统对比"
description: "对比Adam与AdamW在进行正则化时的两种不同"
pubDate: 2024-10-02
category: theory
tags: ["optimization", "adam", "adamw", "weight-decay", "regularization"]
draft: false
---

# 🧠 Adam + L2 与 AdamW 的区别详解

## 1️⃣ Adam + L2（把正则化项加进梯度，耦合方式）

**思想：**  
在每一步更新时，将 L2 正则化项直接加进梯度：

$$
g'_t = g_t + \lambda \theta_t
$$

然后使用标准的 Adam 动量与方差更新：

$$
\begin{aligned}
m_t &= \beta_1 m_{t-1} + (1-\beta_1)\, g'_t \\
v_t &= \beta_2 v_{t-1} + (1-\beta_2)\, (g'_t)^2
\end{aligned}
$$

再进行偏差修正：

$$
\hat m_t = \frac{m_t}{1 - \beta_1^t}, \quad 
\hat v_t = \frac{v_t}{1 - \beta_2^t}
$$

最终参数更新为：

$$
\boxed{
\theta_{t+1} = \theta_t - \eta \frac{\hat m_t}{\sqrt{\hat v_t} + \varepsilon}
}
$$

> ✅ 这里的 \( m_t, v_t \) 已经**包含了正则项 \( \lambda\theta_t \)**。  
> ❌ 因此**不要**再额外做 \((1 - ηλ)\) 的权重衰减。

**缺点：**  
- 正则项会被 \(\sqrt{\hat v_t}\) 的自适应缩放影响；  
- 不同参数的“衰减强度”不一致，导致泛化性变差。

---

## 2️⃣ AdamW（解耦权重衰减，推荐做法）

**思想：**  
把正则项从梯度更新中**解耦出来**，只在参数层面线性衰减。

Adam 的动量与方差仍然只基于真实梯度：

$$
\begin{aligned}
m_t &= \beta_1 m_{t-1} + (1-\beta_1)\, g_t \\
v_t &= \beta_2 v_{t-1} + (1-\beta_2)\, g_t^2
\end{aligned}
$$

偏差修正：

$$
\hat m_t = \frac{m_t}{1 - \beta_1^t}, \quad 
\hat v_t = \frac{v_t}{1 - \beta_2^t}
$$

参数更新时额外加入独立的权重衰减：

$$
\boxed{
\theta_{t+1} = (1 - \eta \lambda)\, \theta_t - \eta \frac{\hat m_t}{\sqrt{\hat v_t} + \varepsilon}
}
$$

> ✅ 这里的 \(m_t, v_t\) **不包含** 正则项；  
> ✅ 权重衰减是一个显式的乘法 \((1 - \eta \lambda)\)，与梯度更新解耦。

---

## 3️⃣ 对比总结

| 项目 | Adam + L2 | AdamW |
|------|------------|--------|
| 正则化项加入位置 | 加进梯度：\( g'_t = g_t + \lambda \theta_t \) | 独立乘 \((1 - \eta \lambda)\) |
| 是否影响动量统计 | ✅ 会影响 | ❌ 不会影响 |
| 衰减是否受自适应缩放影响 | ✅ 是 | ❌ 否 |
| 实现方式（PyTorch） | `torch.optim.Adam(weight_decay=λ)` | `torch.optim.AdamW(weight_decay=λ)` |
| 泛化性能 | 较差 | 更稳、更主流 |

---

### 🧩 一句话总结

> - **Adam + L2**：把正则化当作梯度的一部分（耦合）。  
> - **AdamW**：把权重衰减独立处理（解耦）。  

所以：
- 用 **Adam + L2** → 把 \( \lambda\theta_t \) 加进梯度，不再乘 \((1 - ηλ)\)。  
- 用 **AdamW** → 不加进梯度，只乘 \((1 - ηλ)\)。
