<template>
  <div class="info">
    <div class="container">
      <div class="btn-box">
        <div class="btn" :class="{active:$route.meta.secondItemName === 'agree'}" @click="changeItem('agree')">
          <span>收到的赞</span>
        </div>
        <div class="btn" :class="{active:$route.meta.secondItemName === 'comment'}" @click="changeItem('comment')">
          <span>评论</span>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function changeItem(itemName) {
  router.push({name:itemName})
}
</script>

<style scoped lang="less">
.info {
  background-color: var(--side-bar-bac-color);
  height: 100%;
  padding: 16px 32px 0 32px;
  display: flex;
  justify-content: center;
  overflow: auto;
  .container {
    width: 60%;
    height: 200px;
    .btn-box {
      display: flex;
      padding-bottom: 16px;
      border-bottom: 2px solid var(--publish-container-border-color);
      .btn {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0px 16px 0px 16px;
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

}
</style>