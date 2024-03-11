<template>
  <div class="main-container">
    <SideBar></SideBar>
    <div class="container">
      <router-view></router-view>
    </div>
    <Teleport to="body">
      <TheArticle></TheArticle>
    </Teleport>
  </div>
</template>

<script setup>
import SideBar from './SideBar'
import TheArticle from './TheArticle'
</script>

<style scoped lang="less">
.main-container {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 6fr);
  grid-template-rows: calc(100vh - 72px);
  overflow: hidden;
}
</style>