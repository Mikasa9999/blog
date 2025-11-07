import { HfInference } from '@huggingface/inference';
import { config } from '../config';
import { logger } from '../utils/logger';
import { ClassificationResult } from '../types';

const CATEGORIES = ['theory', 'models', 'practice', 'tools', 'insights'] as const;
const CATEGORY_DESCRIPTIONS = {
  theory: 'AI/ML基础理论和概念，包括数学原理、统计学、概率论等',
  models: '各种机器学习算法和模型，如神经网络、决策树、聚类等',
  practice: '实际应用和项目实践，包括代码实现、部署、优化等',
  tools: '开发工具和框架使用，如TensorFlow、PyTorch、Scikit-learn等',
  insights: '深度思考和行业见解，包括趋势分析、经验分享、观点讨论等'
};

// 如果没有HuggingFace API密钥，使用基于关键词的简单分类
function classifyWithKeywords(title: string, content: string): ClassificationResult {
  const text = (title + ' ' + content).toLowerCase();

  const keywordScores = {
    theory: ['理论', '基础', '原理', '数学', '统计', '概率', '公式', '推导'],
    models: ['模型', '算法', '神经网络', '决策树', '聚类', '回归', '分类', '训练'],
    practice: ['实战', '实践', '项目', '代码', '实现', '部署', '优化', '案例'],
    tools: ['工具', '框架', 'tensorflow', 'pytorch', 'scikit', '库', 'api', '接口'],
    insights: ['思考', '洞见', '观点', '趋势', '分析', '经验', '分享', '见解']
  };

  const scores: Record<string, number> = {};

  for (const [category, keywords] of Object.entries(keywordScores)) {
    let score = 0;
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        score += 1;
      }
    }
    scores[category] = score;
  }

  // 如果没有匹配到关键词，默认分类为practice
  if (Object.values(scores).every(score => score === 0)) {
    return {
      category: 'practice',
      confidence: 0.5,
      alternatives: CATEGORIES.map(cat => ({
        category: cat,
        confidence: 0.2
      }))
    };
  }

  // 找到最高分的分类
  const maxScore = Math.max(...Object.values(scores));
  const maxCategory = Object.keys(scores).find(cat => scores[cat] === maxScore)! as typeof CATEGORIES[number];

  // 计算置信度（基于分数比例）
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const confidence = maxScore / Math.max(totalScore, 1);

  // 生成备选分类
  const alternatives = Object.entries(scores)
    .filter(([cat]) => cat !== maxCategory)
    .map(([cat, score]) => ({
      category: cat as typeof CATEGORIES[number],
      confidence: score / Math.max(totalScore, 1)
    }))
    .sort((a, b) => b.confidence - a.confidence);

  return {
    category: maxCategory,
    confidence,
    alternatives
  };
}

// 使用HuggingFace API进行分类
async function classifyWithHuggingFace(title: string, content: string): Promise<ClassificationResult> {
  if (!config.huggingfaceApiKey) {
    throw new Error('HuggingFace API key not configured');
  }

  const hf = new HfInference(config.huggingfaceApiKey);

  // 使用零样本分类模型
  const prompt = `Classify this AI/ML article into one of these categories:
- theory: ${CATEGORY_DESCRIPTIONS.theory}
- models: ${CATEGORY_DESCRIPTIONS.models}
- practice: ${CATEGORY_DESCRIPTIONS.practice}
- tools: ${CATEGORY_DESCRIPTIONS.tools}
- insights: ${CATEGORY_DESCRIPTIONS.insights}

Title: ${title}
Content: ${content.substring(0, 1000)}...

Category:`;

  try {
    const result = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 10,
        temperature: 0.1,
        return_full_text: false
      }
    });

    const response = result.generated_text.toLowerCase().trim();

    // 解析响应
    for (const category of CATEGORIES) {
      if (response.includes(category)) {
        return {
          category,
          confidence: 0.9, // 假设AI分类置信度较高
          alternatives: CATEGORIES
            .filter(cat => cat !== category)
            .map(cat => ({ category: cat, confidence: 0.02 }))
        };
      }
    }

    // 如果没有匹配，回退到关键词分类
    return classifyWithKeywords(title, content);
  } catch (error) {
    logger.warn('HuggingFace classification failed, falling back to keyword classification', { error });
    return classifyWithKeywords(title, content);
  }
}

export async function classifyArticleWithAI(title: string, content: string): Promise<ClassificationResult> {
  try {
    // 如果有API密钥，优先使用HuggingFace
    if (config.huggingfaceApiKey) {
      return await classifyWithHuggingFace(title, content);
    }

    // 否则使用关键词分类
    return classifyWithKeywords(title, content);
  } catch (error) {
    logger.error('AI classification failed', { error });
    // 如果AI分类失败，回退到关键词分类
    return classifyWithKeywords(title, content);
  }
}