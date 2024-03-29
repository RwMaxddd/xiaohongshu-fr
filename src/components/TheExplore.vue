<template>
  <div class="explore" @scroll="debounceScroll" ref="explore">
    <div class="btn-box">
      <div class="btn" :class="{active:$route.meta.secondItemName === 'discuss'}" @click="changeItem('discuss')">
        <span>讨论</span>
      </div>
      <div class="btn" :class="{active:$route.meta.secondItemName === 'popularization'}" @click="changeItem('popularization')">
        <span>科普</span>
      </div>
    </div>
    <router-view></router-view>
    <div class="loading-box" style="display: flex;justify-content: center">
      <div class="loader" v-show="loading"></div>
    </div>
    <TheEnd v-if="articleStore.isEnding"></TheEnd>
  </div>
</template>

<script setup>
import { useRouter,useRoute } from 'vue-router'
import { debounce } from '../utils/debounce'
import { useArticleStore } from '../store/article'
import { ref } from "vue";
import TheEnd  from './TheEnd'

const router = useRouter()
const route = useRoute()
function changeItem(itemName) {
  router.push({ name:itemName })
}
const explore = ref(null)
const loading = ref(false)
const articleStore = useArticleStore()
async function handleScroll() {
  if (!loading.value && explore.value.scrollHeight - explore.value.clientHeight - explore.value.scrollTop <= 10){
    loading.value = true
    await articleStore.loadArticle(route.meta.secondItemName)
    loading.value = false
  }
}
const debounceScroll = debounce(handleScroll,300)
</script>

<style scoped lang="less">
.loader {
  width: 44px;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side,var(--aside-icon-color) 90%,#0000);
  background:
      var(--_g) 0%   50%,
      var(--_g) 50%  50%,
      var(--_g) 100% 50%;
  background-size: calc(100%/3) 50%;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  20%{background-position:0%   0%, 50%  50%,100%  50%}
  40%{background-position:0% 100%, 50%   0%,100%  50%}
  60%{background-position:0%  50%, 50% 100%,100%   0%}
  80%{background-position:0%  50%, 50%  50%,100% 100%}
}
.explore {
  width: 100%;
  height: 100%;
  background-color: var(--container-bac-color);
  padding: 16px 32px 0 32px;
  overflow: auto;
  .btn-box {
    display: flex;
    margin-bottom: 16px;
    .btn {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 16px 0 16px;
      border-radius: 999px;
      font-size: 16px;
      color: var(--aside-icon-color);
      background-color: var(--side-bar-item-background-color);
      cursor: pointer;
      &:hover {
        background-color: var(--side-bar-item-background-color-hover);
      }
    }
    .btn.active {
      font-weight: 600;
      background-color: var(--side-bar-item-background-color-hover);
    }
  }
}
</style>
