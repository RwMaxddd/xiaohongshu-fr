<template>
  <div class="input-content">
    <div class="input-area the-input">
      <el-input v-model="input" placeholder="搜索小红书" />
      <div class="input-button">
        <div class="close-icon" v-show="isShowClose" @click="clearInputContent">
          <Close style="height: 20px;width: 20px"></Close>
        </div>
        <div class="search-icon">
          <Search style="height: 20px;width: 20px"></Search>
        </div>
      </div>
    </div>
    <div class="suggest-content" v-show="isShowClose">
      <span>1231</span>
      <span>1231</span>
      <span>123sw我是按时执行1</span>
      <span>123注册1</span>
      <span>123sw我是按时执行1</span>
      <span>123注册1</span>
      <span>1</span>
      <span>1w我是按时执行1</span>
      <span>11</span>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import { Close, Search } from '@element-plus/icons-vue'
const input = ref('')
const isShowClose = computed(() => {
  return input.value? true : false
})

function clearInputContent(){
  input.value = ''
}
</script>

<style scoped lang="less">
.input-content{
  position: relative;
  display: flex;
  flex-grow: 1;
  max-width: 450px;
  flex-direction: column;
  .input-area {
    position: relative;
    display: flex;
    width: 100%;
    height: 40px;
    .input-button {
      position: absolute;
      right: 0;
      display: flex;
      .close-icon,
      .search-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        width: 40px;
        cursor: pointer;
        color: var(--icon-color);
        &:hover {
          color: var(--icon-color-hover);
        }
      }
      .search-icon {
        margin-right: 4px;
      }
    }
  }
  .suggest-content{
    position: absolute;
    z-index: 999;
    padding: 50px;
    transform: translateY(50px);
    height: 250px;
    width: 100%;
    background: rosybrown;
    border-radius: 8px;
    display: grid;
    span {
      padding: 2px 4px;
      background: #FFFFFF;
      border-radius: 2px;
    }
  }
}
</style>

<style lang="less">
.the-input {
  .el-input__wrapper {
    padding: 0;
    border-radius: 999px;
    overflow: hidden;
    box-shadow: none;
    .el-input__inner {
      color: var(--input-color);
      background: var(--input-background-color);
      padding: 0 84px 0 16px;
      height: 100%;
    }
  }
}
</style>