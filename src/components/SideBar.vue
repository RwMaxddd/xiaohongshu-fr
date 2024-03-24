<template>
  <div class="side-bar">
    <ul class="channel-list">
      <li class="list-item" :class="{'item-active':explore}" @click.prevent="clickItem('explore')">
        <a href="#">
          <House class="aside-icon"></House>
          <span>发现</span>
        </a>
      </li>
      <li class="list-item" :class="{'item-active':publish}" @click.prevent="clickItem('publish')">
        <a href="#">
          <EditPen class="aside-icon"></EditPen>
          <span>发布</span>
        </a>
      </li>
      <li class="list-item" :class="{'item-active':inform}" @click.prevent="clickItem('inform')">
        <a href="#">
          <Bell class="aside-icon"></Bell>
          <span>通知</span>
        </a>
      </li>
      <li class="list-item" :class="{'item-active':admin}" @click.prevent="clickItem('admin')" v-if="userStore.isAdmin">
        <a href="#">
          <User class="aside-icon"></User>
          <span>审核</span>
        </a>
      </li>
      <li class="list-item" :class="{'item-active':user && userStore.userId === $route.params.id}" @click.prevent="clickItem('user')" v-if="userStore.isLogin">
        <a href="#">
          <img :src="userStore.avatarSrc" alt="">
          <span>我</span>
        </a>
      </li>
      <li class="list-item login" v-else @click.prevent="toLogin">
        <a href="#">
          <span>未登录</span>
        </a>
      </li>
    </ul>
    <div class="information-container" @click.prevent="logOutBtn" v-show="userStore.isLogin">
      <a href="#">
        <Setting class="aside-icon"></Setting>
        <span>退出登录</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { House, EditPen, Bell, Setting, User} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import {ref, watch} from "vue";
import { useUserStore } from '../store/user'


const userStore = useUserStore()
userStore.getAvatarSrc()
const router = useRouter()
const route = useRoute()

const itemObj = {
  explore:ref(false),
  publish:ref(false),
  inform:ref(false),
  user:ref(false),
  admin:ref(false)
}
watch(() => route.meta.itemName, (newValue, oldValue) => {
  if (newValue === 'article' || oldValue === 'article') {
    return
  }
  if (oldValue) {
    itemObj[oldValue].value = false
  }
  itemObj[newValue].value = true
},{ immediate: true })
const {explore, publish, inform, user, admin} = itemObj

function clickItem(item){
  if (item !== "user") {
    router.push({ name: item })
  }else {
    router.push({ name: item,params: { id: userStore.userId } })
  }
}
function toLogin() {
  router.push({ name: 'login' })
}
function logOutBtn() {
  userStore.logOut()
  router.push({ name: 'explore' })
}
</script>

<style scoped lang="less">
.item-active {
  background-color: var(--side-bar-item-background-color-hover) !important;
}
.side-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 0 0 16px;
  height: 100%;
  background-color: var(--side-bar-bac-color);
  .channel-list {
    li {
      padding-left: 16px;
      margin-bottom: 8px;
      border-radius: 999px;
      background-color: var(--side-bar-item-background-color);
      &:hover {
        background-color: var(--side-bar-item-background-color-hover);
      }
      a {
        display: flex;
        align-items: center;
        width: 100%;
        height: 48px;
        font-size: 16px;
        font-weight: 600;
        color: var(--aside-icon-color);
        .aside-icon {
          height: 24px;
          width: 24px;
        }
        img {
          height: 24px;
          width: 24px;
          object-fit: cover;
          border-radius: 999px;
        }
        span {
          margin-left: 12px;
        }
      }
    }
    .login {
      padding-left: 0;
      border-radius: 999px;
      background-color: rgb(255,46,77);
      &:hover {
        background-color: rgb(255,46,77);
      }
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 48px;
        font-size: 16px;
        font-weight: 600;
        color: rgb(255,255,255);
        span {
          margin-left: 0;
        }
      }
    }
  }
  .information-container {
    margin-bottom: 20px;
    padding-left: 16px;
    border-radius: 999px;
    &:hover {
      background-color: var(--side-bar-item-background-color-hover);
    }
    a {
      display: flex;
      align-items: center;
      width: 100%;
      height: 48px;
      font-size: 16px;
      font-weight: 600;
      color: var(--aside-icon-color);
      .aside-icon {
        height: 24px;
        width: 24px;
      }
      span {
        margin-left: 12px;
      }
    }
  }
}
</style>