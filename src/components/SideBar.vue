<template>
  <div class="side-bar">
    <ul class="channel-list">
      <li class="list-item" :class="{'item-active':isDiscover}" @click.prevent="clickItem('isDiscover')">
        <a href="#">
          <House class="aside-icon"></House>
          <span>发现</span>
        </a>
      </li>
      <li class="list-item" :class="{'item-active':isPublish}" @click.prevent="clickItem('isPublish')">
        <a href="#">
          <EditPen class="aside-icon"></EditPen>
          <span>发布</span>
        </a>
      </li>
      <li class="list-item" :class="{'item-active':isInform}" @click.prevent="clickItem('isInform')">
        <a href="#">
          <Bell class="aside-icon"></Bell>
          <span>通知</span>
        </a>
      </li>
      <li class="list-item" :class="{'item-active':isPersonal}" @click.prevent="clickItem('isPersonal')" v-show="userStore.isLogin">
        <a href="#">
          <img :src="userStore.avatarSrc" alt="">
          <span>我</span>
        </a>
      </li>
      <li class="list-item login" v-show="!userStore.isLogin" @click.prevent="toLogin">
        <a href="#">
          <span>未登录</span>
        </a>
      </li>
    </ul>
    <div class="information-container">
      <a href="#">
        <Setting class="aside-icon"></Setting>
        <span>更多</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { House, EditPen, Bell, Setting} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ref } from "vue";
import { useUserStore } from '../store/user'


const userStore = useUserStore()
userStore.getAvatarSrc()
const nowActiveItem = ref('isDiscover');
const router = useRouter()

const itemObj = {
  isDiscover:ref(true),
  isPublish:ref(false),
  isInform:ref(false),
  isPersonal:ref(false),
}
const {isDiscover, isPublish, isInform, isPersonal} = itemObj

function clickItem(item){
  if(item !== nowActiveItem.value){
    itemObj[nowActiveItem.value].value = false
    itemObj[item].value = true
    nowActiveItem.value = item

    const tmpObj = {
      isDiscover:'explore',
      isPublish:'publish',
      isPersonal:'user',
    }
    router.push({ name: tmpObj[item] })
  }
}
function toLogin() {
  router.push({ name: 'login' })
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