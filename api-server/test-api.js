import fetch from 'node-fetch';

const API_BASE = 'http://localhost:3001';

async function testAPI() {
  try {
    console.log('🧪 Testing Blog Article Agent API...\n');

    // 1. 测试健康检查
    console.log('1. Testing health check...');
    const healthResponse = await fetch(`${API_BASE}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);

    // 2. 测试分类查询
    console.log('\n2. Testing categories endpoint...');
    const categoriesResponse = await fetch(`${API_BASE}/api/categories`);
    const categoriesData = await categoriesResponse.json();
    console.log('✅ Categories:', categoriesData.data.length, 'categories found');

    // 3. 测试分类功能
    console.log('\n3. Testing classification...');
    const classifyResponse = await fetch(`${API_BASE}/api/articles/classify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: '深度学习基础概念',
        content: '深度学习是机器学习的一个分支，它基于人工神经网络的概念...'
      })
    });
    const classifyData = await classifyResponse.json();
    console.log('✅ Classification result:', classifyData.data);

    // 4. 测试从文件添加文章
    console.log('\n4. Testing adding article from file...');
    const filePath = 'C:\\\\Users\\\\Lenovo\\\\Desktop\\\\main\\\\test-article.md';
    const addFileResponse = await fetch(`${API_BASE}/api/articles/from-file`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filePath: filePath,
        tags: ['深度学习', '神经网络']
      })
    });
    const addFileData = await addFileResponse.json();

    if (addFileData.success) {
      console.log('✅ Article added successfully:', addFileData.data);
    } else {
      console.log('❌ Failed to add article:', addFileData);
    }

    console.log('\n🎉 All tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI();