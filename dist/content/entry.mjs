// astro-head-inject
import {
	createCollectionToGlobResultMap,
	createGetCollection,
	createGetDataEntryById,
	createGetEntries,
	createGetEntry,
	createGetEntryBySlug,
	createReference,
} from 'astro/content/runtime';

export { defineCollection, renderEntry as render } from 'astro/content/runtime';
export { z } from 'astro/zod';

const contentDir = '/src/content/';

const contentEntryGlob = {
  "/src/content/blog/models/transformer-intro.md": () => import("./blog/models/transformer-intro.mjs"),
  "/src/content/blog/models/强化学习.md": () => import("./blog/models/强化学习.mjs"),
  "/src/content/blog/practice/1.md": () => import("./blog/practice/1.mjs"),
  "/src/content/blog/theory/adamW.md": () => import("./blog/theory/adamW.mjs"),
  "/src/content/blog/theory/c++.md": () => import("./blog/theory/c++.mjs"),
  "/src/content/blog/theory/langchain.md": () => import("./blog/theory/langchain.mjs"),
  "/src/content/blog/theory/langchain2.md": () => import("./blog/theory/langchain2.mjs"),
  "/src/content/blog/theory/mysql.md": () => import("./blog/theory/mysql.mjs"),
  "/src/content/blog/theory/强化学习.md": () => import("./blog/theory/强化学习.mjs"),
  "/src/content/blog/theory/梯度下降.md": () => import("./blog/theory/梯度下降.mjs"),
  "/src/content/blog/theory/模板.md": () => import("./blog/theory/模板.mjs"),
};
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = {
};
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
const collectionToEntryMap = createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"blog":{"type":"content","entries":{"models/transformer-intro":"/src/content/blog/models/transformer-intro.md","models/强化学习":"/src/content/blog/models/强化学习.md","practice/1":"/src/content/blog/practice/1.md","theory/adamw":"/src/content/blog/theory/adamW.md","theory/c":"/src/content/blog/theory/c++.md","theory/langchain":"/src/content/blog/theory/langchain.md","theory/langchain2":"/src/content/blog/theory/langchain2.md","theory/mysql":"/src/content/blog/theory/mysql.md","theory/强化学习":"/src/content/blog/theory/强化学习.md","theory/梯度下降":"/src/content/blog/theory/梯度下降.md","theory/模板":"/src/content/blog/theory/模板.md"}}};

const collectionNames = new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = {
  "/src/content/blog/models/transformer-intro.md": () => import("./blog/models/transformer-intro.entry.mjs"),
  "/src/content/blog/models/强化学习.md": () => import("./blog/models/强化学习.entry.mjs"),
  "/src/content/blog/practice/1.md": () => import("./blog/practice/1.entry.mjs"),
  "/src/content/blog/theory/adamW.md": () => import("./blog/theory/adamW.entry.mjs"),
  "/src/content/blog/theory/c++.md": () => import("./blog/theory/c++.entry.mjs"),
  "/src/content/blog/theory/langchain.md": () => import("./blog/theory/langchain.entry.mjs"),
  "/src/content/blog/theory/langchain2.md": () => import("./blog/theory/langchain2.entry.mjs"),
  "/src/content/blog/theory/mysql.md": () => import("./blog/theory/mysql.entry.mjs"),
  "/src/content/blog/theory/强化学习.md": () => import("./blog/theory/强化学习.entry.mjs"),
  "/src/content/blog/theory/梯度下降.md": () => import("./blog/theory/梯度下降.entry.mjs"),
  "/src/content/blog/theory/模板.md": () => import("./blog/theory/模板.entry.mjs"),
};
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
export const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

export const getEntryBySlug = createGetEntryBySlug({
	getEntryImport: createGlobLookup(contentCollectionToEntryMap),
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	collectionNames,
});

export const getDataEntryById = createGetDataEntryById({
	getEntryImport: createGlobLookup(dataCollectionToEntryMap),
	collectionNames,
});

export const getEntry = createGetEntry({
	getEntryImport: createGlobLookup(collectionToEntryMap),
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	collectionNames,
});

export const getEntries = createGetEntries(getEntry);

export const reference = createReference({ lookupMap });
