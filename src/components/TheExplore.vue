<template>
  <div class="explore">
    <WaterfallArticles :articleList="articleStore.articleList"></WaterfallArticles>
  </div>
</template>

<script setup>
import { useArticleStore } from '../store/article'
import WaterfallArticles  from './WaterfallArticles'

const articleStore = useArticleStore()
articleStore.loadArticle()
</script>

<style scoped lang="less">
.explore {
  width: 100%;
  height: 100%;
  background-color: var(--container-bac-color);
  padding: 16px 32px 0 32px;
  overflow: auto;
}
</style>
