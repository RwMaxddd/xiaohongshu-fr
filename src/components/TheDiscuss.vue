<template>
  <div class="discuss">
    <WaterfallArticles :articleList="articleStore.articleList"></WaterfallArticles>
  </div>
</template>

<script setup>
import { useArticleStore } from '../store/article'
import WaterfallArticles  from './WaterfallArticles'

const articleStore = useArticleStore()
articleStore.loadArticle('discuss')

</script>

<style scoped lang="less">
.discuss {
  overflow: auto;
}
</style>