<template>
  <div class="user-box">
    <div class="header-box">
      <div class="information">
        <div class="avatar">
          <img src="../assets/1.jpg" alt="error">
        </div>
        <div class="info-part">
          <div class="user-name">小红书653A50B2</div>
          <div class="user-id">
            <span>小红书号:</span>
            <span>34012</span>
          </div>
          <div class="user-intro">还没有简介</div>
          <div class="data-info">
            <div class="follow">
              <span class="count">12</span>
              <span class="text">关注</span>
            </div>
            <div class="fans">
              <span class="count">45</span>
              <span class="text">粉丝</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-articles">
      <WaterfallArticles :articleList="articleStore.userArticleList"></WaterfallArticles>
      <TheEnd></TheEnd>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useArticleStore } from '../store/article'
import WaterfallArticles  from './WaterfallArticles'
import TheEnd  from './TheEnd'

const route = useRoute()
const articleStore = useArticleStore()
articleStore.loadUserArticle(route.params.id)
</script>

<style scoped lang="less">
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
    }
  }
  .user-articles {
    padding: 24px 0 0 0;
  }
}
</style>