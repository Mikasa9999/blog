/* empty css                                       */
import { createAstro, createComponent, renderComponent, renderTemplate, maybeRenderHead, addAttribute } from '../chunks/1762231898567/astro/server.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $$Layout } from '../chunks/1762231898567/Layout.mjs';
import { getCollection } from '../content/entry.mjs';
export { renderers } from '../renderers.mjs';
import 'clsx';
import '@oslojs/encoding';
import 'cssesc';

const $$Astro = createAstro("https://your-domain.vercel.app");
async function getStaticPaths() {
  const categoryTitleMap = {
    theory: "\u7406\u8BBA\u57FA\u7840",
    models: "\u7B97\u6CD5\u4E0E\u6A21\u578B",
    practice: "\u5B9E\u6218\u4E0E\u5E94\u7528",
    tools: "\u5DE5\u5177\u4E0E\u6846\u67B6",
    insights: "\u601D\u8003\u4E0E\u6D1E\u89C1"
  };
  const articles = await getCollection("blog");
  const published = articles.filter((article) => !article.data.draft);
  return Object.entries(categoryTitleMap).map(([category, title]) => {
    const categoryArticles = published.filter((article) => article.data.category === category).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
    return {
      params: { category },
      props: {
        category,
        articles: categoryArticles,
        title
      }
    };
  });
}
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { category, articles, title } = Astro2.props;
  const pageTitle = title + " | AI/ML \u77E5\u8BC6\u535A\u5BA2";
  const description = "\u805A\u7126" + title + "\u7684\u6587\u7AE0\u5408\u96C6";
  const getArticleSlug = (article) => article.slug?.split("/")?.pop() ?? article.slug;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": description, "backgroundType": "category" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="text-center mb-16 py-16 relative overflow-hidden rounded-3xl mx-6"> <!-- 背景渐变和图案 --> <div class="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white/60 to-accent-50/40 dark:from-primary-900/80 dark:via-primary-800/60 dark:to-accent-900/30 backdrop-blur-sm"></div> <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-200/20 via-transparent to-transparent dark:from-accent-600/10"></div> <!-- 浮动元素 --> <div class="absolute top-8 left-8 w-16 h-16 bg-blue-400/10 rounded-full blur-xl animate-float"></div> <div class="absolute top-16 right-12 w-12 h-12 bg-purple-400/10 rounded-full blur-xl animate-float animation-delay-1000"></div> <div class="absolute bottom-12 left-1/3 w-10 h-10 bg-green-400/10 rounded-full blur-xl animate-float animation-delay-2000"></div> <div class="relative z-10 max-w-4xl mx-auto px-6"> <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-900 via-accent-600 to-purple-600 dark:from-primary-50 dark:via-accent-400 dark:to-purple-400 bg-clip-text text-transparent mb-4 animate-fade-in"> ${title} </h1> <p class="text-xl text-primary-600 dark:text-primary-400 max-w-2xl mx-auto animate-fade-in animation-delay-200">
探索 ${title} 相关的精选内容
</p> </div> </section>  <section class="max-w-6xl mx-auto px-6"> ${articles.length > 0 ? renderTemplate`<div class="space-y-8"> ${articles.map((article) => renderTemplate`<div class="group bg-white dark:bg-primary-800 border border-primary-200/50 dark:border-primary-700/50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"> <a${addAttribute("/" + category + "/" + getArticleSlug(article), "href")} class="block"> <div class="flex items-start justify-between mb-4"> <span${addAttribute(`px-4 py-2 rounded-full text-sm font-medium ${article.data.category === "theory" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" : article.data.category === "models" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : article.data.category === "practice" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" : article.data.category === "tools" ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300" : "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300"} transition-colors duration-200`, "class")}> ${article.data.category === "theory" ? "\u7406\u8BBA\u57FA\u7840" : article.data.category === "models" ? "\u7B97\u6CD5\u4E0E\u6A21\u578B" : article.data.category === "practice" ? "\u5B9E\u6218\u4E0E\u5E94\u7528" : article.data.category === "tools" ? "\u5DE5\u5177\u4E0E\u6846\u67B6" : "\u601D\u8003\u4E0E\u6D1E\u89C1"} </span> <time${addAttribute(article.data.pubDate.toISOString(), "datetime")} class="text-primary-500 dark:text-primary-400 text-sm"> ${article.data.pubDate.toLocaleDateString("zh-CN")} </time> </div> <h2 class="text-2xl font-bold text-primary-900 dark:text-primary-50 mb-4 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-200"> ${article.data.title} </h2> <p class="text-primary-600 dark:text-primary-400 text-lg leading-relaxed mb-6"> ${article.data.description} </p> <div class="flex items-center text-accent-600 dark:text-accent-400 font-medium group-hover:translate-x-2 transition-transform duration-200">
阅读更多
<svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </div> </a> </div>`)} </div>` : renderTemplate`<div class="text-center py-16"> <div class="text-6xl mb-4">📚</div> <p class="text-primary-600 dark:text-primary-400 text-xl mb-4">
该分类下暂时没有文章，敬请期待
</p> <a href="/" class="inline-block px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-all duration-200 hover:scale-105">
返回首页
</a> </div>`} </section> ` })}`;
}, "C:/Users/Lenovo/Desktop/main/src/pages/[category]/index.astro", void 0);

const $$file = "C:/Users/Lenovo/Desktop/main/src/pages/[category]/index.astro";
const $$url = "/[category]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
