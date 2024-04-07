<template>
  <div class="search">
    <WaterfallArticles :articleList="articleStore.articleList"></WaterfallArticles>
    <TheEnd v-if="articleStore.isEnding"></TheEnd>
  </div>
</template>

<script setup>
import { useArticleStore } from '../store/article'
import WaterfallArticles  from './WaterfallArticles'
import { useRoute } from 'vue-router'
import {watchEffect} from "vue";
import TheEnd  from './TheEnd'

const articleStore = useArticleStore()
const route = useRoute()
watchEffect(() => {
  articleStore.loadSearchArticles(route.query.keyWord)
})
</script>

<style scoped lang="less">
.search {
  height: 100%;
  background-color: var(--side-bar-bac-color);
  padding: 16px;
}
</style>