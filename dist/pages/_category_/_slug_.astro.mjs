/* empty css                                          */
import { createAstro, createComponent, renderComponent, renderTemplate, maybeRenderHead, addAttribute } from '../../chunks/1762231898567/astro/server.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $$Layout } from '../../chunks/1762231898567/Layout.mjs';
import { getCollection } from '../../content/entry.mjs';
export { renderers } from '../../renderers.mjs';
import 'clsx';
import '@oslojs/encoding';
import 'cssesc';

const $$Astro = createAstro("https://your-domain.vercel.app");
async function getStaticPaths() {
  const articles = await getCollection("blog");
  return articles.filter((article) => !article.data.draft).map((article) => {
    const slug = article.slug?.split("/")?.pop() ?? article.slug;
    return {
      params: {
        category: article.data.category,
        slug
      },
      props: { article }
    };
  });
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { article } = Astro2.props;
  const { Content } = await article.render();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": article.data.title, "description": article.data.description, "backgroundType": "article" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl mx-auto"> <!-- 文章头部 --> <article class="prose prose-lg dark:prose-invert max-w-none"> <header class="mb-12"> <div class="flex items-center space-x-4 mb-4"> <span${addAttribute(`px-3 py-1 rounded-full text-sm font-medium ${article.data.category === "theory" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : article.data.category === "models" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : article.data.category === "practice" ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" : article.data.category === "tools" ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" : "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"}`, "class")}> ${article.data.category} </span> <time class="text-primary-600 dark:text-primary-400 text-sm"> ${new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(article.data.pubDate)} </time> </div> <h1 class="text-4xl font-bold text-primary-900 dark:text-primary-50 mb-4"> ${article.data.title} </h1> <p class="text-xl text-primary-600 dark:text-primary-400 leading-relaxed"> ${article.data.description} </p> ${article.data.tags && article.data.tags.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2 mt-6"> ${article.data.tags.map((tag) => renderTemplate`<span class="px-3 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 rounded-full text-sm">
#${tag} </span>`)} </div>`} </header> <!-- 文章内容 --> <div class="border-t border-primary-200 dark:border-primary-700 pt-8"> ${renderComponent($$result2, "Content", Content, {})} </div> <!-- 文章底部 --> <footer class="border-t border-primary-200 dark:border-primary-700 mt-12 pt-8"> <div class="flex justify-between items-center text-sm text-primary-500 dark:text-primary-400"> <span>发布于 ${new Intl.DateTimeFormat("zh-CN").format(article.data.pubDate)}</span> ${article.data.updatedDate && renderTemplate`<span>更新于 ${new Intl.DateTimeFormat("zh-CN").format(article.data.updatedDate)}</span>`} </div> </footer> </article> </div> ` })}`;
}, "C:/Users/Lenovo/Desktop/main/src/pages/[category]/[slug].astro", void 0);

const $$file = "C:/Users/Lenovo/Desktop/main/src/pages/[category]/[slug].astro";
const $$url = "/[category]/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
