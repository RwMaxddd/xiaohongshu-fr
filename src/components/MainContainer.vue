<template>
  <div class="main-container">
    <SideBar></SideBar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import SideBar from './SideBar'
</script>

<style scoped lang="less">
.main-container {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 72px);
  overflow: hidden;
  .container {
    flex-grow: 8;
  }
}
</style>