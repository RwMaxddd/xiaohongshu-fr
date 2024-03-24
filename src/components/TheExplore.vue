<template>
  <div class="explore">
    <div class="btn-box">
      <div class="btn" :class="{active:$route.meta.secondItemName === 'discuss'}" @click="changeItem('discuss')">
        <span>讨论</span>
      </div>
      <div class="btn" :class="{active:$route.meta.secondItemName === 'popularization'}" @click="changeItem('popularization')">
        <span>科普</span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function changeItem(itemName) {
  router.push({ name:itemName })
}
</script>

<style scoped lang="less">
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
    }
    .btn.active {
      font-weight: 600;
      background-color: var(--side-bar-item-background-color-hover);
    }
  }
}
</style>
