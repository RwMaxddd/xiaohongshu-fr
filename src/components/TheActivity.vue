<template>
  <div class="popularization">
    <WaterfallArticles :articleList="articleStore.articleList"></WaterfallArticles>
  </div>
</template>

<script setup>
import { useArticleStore } from '../store/article'
import WaterfallArticles  from './WaterfallArticles'

const articleStore = useArticleStore()
articleStore.loadArticle('activity')
</script>

<style scoped>

</style>