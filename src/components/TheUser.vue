<template>
  <div class="user-box">
    <div class="header-box">
      <div style="width: 100%;height: 200px;display: flex;justify-content: center;padding-top: 50px;" v-if="userInfoLoader">
        <div class="loader"></div>
      </div>
      <div class="information" v-else>
        <div class="avatar">
          <img :src="userInfo.photo" alt="error">
        </div>
        <div class="info-part">
          <div class="user-name">{{ userInfo.user_name }}</div>
          <div class="user-id">
            <span>小红书号:</span>
            <span>{{ currentUserId }}</span>
          </div>
          <div class="user-intro">{{ userInfo.intro }}</div>
          <div class="data-info">
            <div class="follow">
              <span class="count">{{ userInfo.like_count }}</span>
              <span class="text">关注</span>
            </div>
            <div class="fans">
              <span class="count">{{ userInfo.fans_count }}</span>
              <span class="text">粉丝</span>
            </div>
          </div>
        </div>
        <div class="btn">
          <ModifyBtn v-if="userStore.userId === currentUserId" @click="userStore.isShowModifyForm = true"></ModifyBtn>
          <FollowBtn v-else :data="data" @handleFollow="handleFollow" @cancelFollow="cancelFollow"></FollowBtn>
        </div>
      </div>
    </div>
    <div class="user-articles">
      <WaterfallArticles :articleList="articleStore.articleList"></WaterfallArticles>
      <TheEnd></TheEnd>
    </div>
    <Teleport to="body">
      <ModifyForm :user_name="userInfo.user_name" :intro="userInfo.intro" :photo="userInfo.photo" :user_id="route.params.id"></ModifyForm>
    </Teleport>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useArticleStore } from '../store/article'
import { useUserStore } from '../store/user'
import WaterfallArticles  from './WaterfallArticles'
import TheEnd  from './TheEnd'
import FollowBtn from './FollowBtn'
import ModifyBtn from './ModifyBtn'
import ModifyForm from './ModifyForm'
import {getUserInfo} from '../api/user'
import { ref, watchEffect} from "vue";
import { useFollow } from "../utils/useFollow"

const userStore = useUserStore()
const route = useRoute()
const userInfo = ref({
  user_name:'',
  intro:'',
  photo:'',
  fans_count:0,
  like_count:0,
})
const isFans = ref(false)
const { data,handleFollow,cancelFollow } = useFollow(isFans)
const currentUserId = ref(route.params.id)
const userInfoLoader = ref(true)
async function getCurrentUserInfo() {
  userInfoLoader.value = true
  const msgData = await getUserInfo(route.params.id,userStore.userId)
  userInfo.value.user_name = msgData.data.user_name
  userInfo.value.intro = msgData.data.intro
  userInfo.value.photo = msgData.data.photo
  userInfo.value.fans_count = msgData.data.fans_count
  userInfo.value.like_count = msgData.data.like_count
  userInfoLoader.value = false
  isFans.value = msgData.data.isFans
}

const articleStore = useArticleStore()

watchEffect(() => {
  currentUserId.value = route.params.id
  articleStore.loadUserArticle(route.params.id)
  getCurrentUserInfo()
})
</script>

<style scoped lang="less">
.loader {
  height: 15px;
  aspect-ratio: 4;
  --_g: no-repeat radial-gradient(farthest-side,#000 90%,#0000);
  background:
      var(--_g) left,
      var(--_g) right;
  background-size: 25% 100%;
  display: grid;
}
.loader:before,
.loader:after {
  content: "";
  height: inherit;
  aspect-ratio: 1;
  grid-area: 1/1;
  margin: auto;
  border-radius: 50%;
  transform-origin: -100% 50%;
  background: #000;
  animation: l49 1s infinite linear;
}
.loader:after {
  transform-origin: 200% 50%;
  --s:-1;
  animation-delay: -.5s;
}

@keyframes l49 {
  58%,
  100% {transform: rotate(calc(var(--s,1)*1turn))}
}
.user-box {
  padding: 16px 32px 0 32px;
  height: 100%;
  overflow: auto;
  background-color: var(--side-bar-bac-color);
  .header-box {
    display: flex;
    justify-content: center;
    border-bottom: 2px solid var(--publish-container-border-color);
    .information {
      display: flex;
      padding: 48px 0 48px 0;
      .avatar {
        height: 8vw;
        width: 8vw;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid var(--publish-container-border-color);
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
      .info-part {
        margin-left: 32px;
        .user-name {
          font-weight: 600;
          font-size: 24px;
          line-height: 120%;
          color: var(--article-title-color);
        }
        .user-id {
          font-size: 12px;
          line-height: 120%;
          margin-top: 8px;
          color: var(--articlebottom-container-color);
        }
        .user-intro {
          font-size: 14px;
          line-height: 140%;
          color: var(--article-title-color);
          margin-top: 16px;
        }
        .data-info {
          display: flex;
          margin-top: 20px;
          div {
            margin-right: 16px;
            .count {
              font-weight: 500;
              font-size: 14px;
              margin-right: 4px;
              color: var(--article-title-color);
            }
            .text {
              font-size: 14px;
              line-height: 120%;
              color: var(--articlebottom-container-color);
            }
          }
        }
      }
      .btn {
        align-self: start;
        margin-left: 40px;
        cursor:pointer;
      }
    }
  }
  .user-articles {
    padding: 24px 0 0 0;
  }
}

</style>

