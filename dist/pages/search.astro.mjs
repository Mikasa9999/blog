/* empty css                                       */
import { createComponent, renderComponent, renderTemplate, maybeRenderHead } from '../chunks/1762231898567/astro/server.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $$Layout } from '../chunks/1762231898567/Layout.mjs';
export { renderers } from '../renderers.mjs';
import 'clsx';
import '@oslojs/encoding';
import 'cssesc';

const $$Search = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "\u641C\u7D22 - AI/ML \u77E5\u8BC6\u535A\u5BA2", "backgroundType": "search" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="text-center mb-16 py-16 relative overflow-hidden rounded-3xl mx-6"> <!-- 背景渐变和图案 --> <div class="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white/60 to-accent-50/40 dark:from-primary-900/80 dark:via-primary-800/60 dark:to-accent-900/30 backdrop-blur-sm"></div> <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-200/20 via-transparent to-transparent dark:from-accent-600/10"></div> <!-- 浮动元素 --> <div class="absolute top-8 left-8 w-16 h-16 bg-blue-400/10 rounded-full blur-xl animate-float"></div> <div class="absolute top-16 right-12 w-12 h-12 bg-purple-400/10 rounded-full blur-xl animate-float animation-delay-1000"></div> <div class="absolute bottom-12 left-1/3 w-10 h-10 bg-green-400/10 rounded-full blur-xl animate-float animation-delay-2000"></div> <div class="relative z-10 max-w-4xl mx-auto px-6"> <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-900 via-accent-600 to-purple-600 dark:from-primary-50 dark:via-accent-400 dark:to-purple-400 bg-clip-text text-transparent mb-4 animate-fade-in">
全站搜索
</h1> <p class="text-xl text-primary-600 dark:text-primary-400 max-w-2xl mx-auto animate-fade-in animation-delay-200">
搜索所有人工智能与机器学习相关内容
</p> </div> </section>  <div class="max-w-4xl mx-auto px-6"> <!-- Search Input --> <div class="mb-16"> <div class="relative max-w-2xl mx-auto"> <input type="text" id="search-input" placeholder="输入关键词搜索文章..." class="w-full px-8 py-5 pl-16 rounded-2xl border border-primary-300/50 dark:border-primary-600/50 bg-white/80 dark:bg-primary-800/80 backdrop-blur-sm text-primary-900 dark:text-primary-50 focus:outline-none focus:ring-4 focus:ring-accent-500/20 focus:border-accent-500 text-xl shadow-lg transition-all duration-300 hover:shadow-xl"> <div class="absolute left-6 top-1/2 transform -translate-y-1/2 text-primary-400 text-2xl">
🔍
</div> </div> </div> <!-- Search Results --> <div id="search-results" class="space-y-8"> <div class="text-center py-16"> <div class="text-6xl mb-4">🔍</div> <p class="text-primary-600 dark:text-primary-400 text-xl">
输入关键词开始搜索
</p> </div> </div> </div>  ` })}`;
}, "C:/Users/Lenovo/Desktop/main/src/pages/search.astro", void 0);

const $$file = "C:/Users/Lenovo/Desktop/main/src/pages/search.astro";
const $$url = "/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Search,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
