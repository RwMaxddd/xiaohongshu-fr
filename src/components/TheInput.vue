<template>
  <div class="input-content">
    <div class="input-area the-input">
      <el-input v-model="input" placeholder="搜索小红书" @focus="handleFocus" @blur="cancelFocus" @input="debounceInput"/>
      <div class="input-button">
        <div class="close-icon" v-show="isShowClose" @click="clearInputContent">
          <Close style="height: 20px;width: 20px"></Close>
        </div>
        <div class="search-icon" @click="handleSearch(input)">
          <Search style="height: 20px;width: 20px"></Search>
        </div>
      </div>
    </div>
    <div class="suggest-content" v-show="isFocus">
      <div class="history" v-if="!input && searchHistory.length">
        <div class="header">
          <span>历史记录</span>
          <span class="icon" @mousedown="deleteHistory"><Delete style="height: 14px;width: 14px"></Delete></span>
        </div>
        <div class="history-list">
          <span v-for="(item,index) in searchHistory" :key="index" @mousedown="handleSearch(item)">{{item}}</span>
        </div>
      </div>
      <div class="tips" v-else>
        <div class="tip" v-for="(item,index) in tips" :key="index" @mousedown="handleSearch(item.title)">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import { Close, Search, Delete} from '@element-plus/icons-vue'
import { debounce } from '../utils/debounce'
import { searchTips } from '../api/articles'
import { useRouter } from 'vue-router'

const input = ref('')
const router = useRouter()
const searchHistory = ref([])
const tips = ref([])
const isFocus = ref(false)
const isShowClose = computed(() => {
  return input.value? true : false
})
function initHistoryList() {
  const historyList = localStorage.getItem('historyList')
  if (historyList){
    searchHistory.value = (JSON.parse(historyList)).list
  }
}
initHistoryList()
function handleFocus() {
  isFocus.value = true
}
function cancelFocus() {
  isFocus.value = false
}
function clearInputContent(){
  input.value = ''
}
function saveHistory(searchWord) {
  const length = searchHistory.value.length
  const reaptWordIndex = searchHistory.value.indexOf(searchWord)
  if (reaptWordIndex != -1){
    searchHistory.value.splice(reaptWordIndex,1)
  }
  if (length >= 10){
    searchHistory.value.splice(length-1,1)
  }
  searchHistory.value.unshift(searchWord)
  const historyListTemplate = {
    list:[...searchHistory.value]
  }
  localStorage.setItem('historyList',JSON.stringify(historyListTemplate))
}
function deleteHistory() {
  searchHistory.value = []
  const historyListTemplate = {
    list:[...searchHistory.value]
  }
  localStorage.setItem('historyList',JSON.stringify(historyListTemplate))
}
function handleSearch(keyWord){
  input.value = keyWord
  router.push({ name:'search', query: { keyWord }})
  saveHistory(keyWord)
}
async function handleInput(){
  try {
    if (input.value) {
      tips.value = (await searchTips(input.value)).data.slice(0, 8)
    }
  }catch (e) {
    console.log(e.message)
  }
}
const debounceInput = debounce(handleInput,300)
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
    transform: translateY(50px);
    width: 100%;
    background-color: var(--search-bac-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    border-radius: 8px;
    display: grid;
    overflow: hidden;
    .history {
      padding: 12px;
      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        span {
          font-size: 12px;
          color: var(--article-user-name-color);
        }
        .icon {
          cursor: pointer;
          &:hover {
            color: var(--article-user-name-color);
          }
        }
      }
      .history-list {
        display: flex;
        flex-wrap: wrap;
        cursor: pointer;
        span {
          padding: 8px 12px 8px 12px;
          background-color: var(--side-bar-item-background-color-hover);
          border-radius: 999px;
          margin-right: 12px;
          margin-bottom: 12px;
          color: var(--aside-icon-color);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 150px;
        }
      }
    }
    .tips {
      .tip {
        cursor: pointer;
        padding: 8px;
        margin: 8px;
        background-color: var(--search-bac-color);
        border-radius: 8px;
        color: var(--aside-icon-color);
        &:hover {
          background-color: var(--side-bar-item-background-color-hover);
        }
      }
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