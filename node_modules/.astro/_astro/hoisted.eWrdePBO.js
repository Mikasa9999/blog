import"./hoisted.n3v2uKZh.js";function e(){const r=document.getElementById("search-input"),t=document.getElementById("search-results");r.addEventListener("input",n=>{if(!n.target.value.trim()){t.innerHTML=`
            <div class="text-center py-16">
              <div class="text-6xl mb-4">🔍</div>
              <p class="text-primary-600 dark:text-primary-400 text-xl">
                输入关键词开始搜索
              </p>
            </div>
          `;return}t.innerHTML=`
          <div class="text-center py-16">
            <div class="text-6xl mb-4">🔧</div>
            <p class="text-primary-600 dark:text-primary-400 text-xl mb-4">
              搜索功能正在开发中
            </p>
            <p class="text-primary-500 dark:text-primary-400">
              请运行 <code class="bg-primary-100 dark:bg-primary-800 px-2 py-1 rounded">npm run pagefind</code> 生成搜索索引
            </p>
          </div>
        `})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e();
