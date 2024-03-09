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
      <Waterfall
          :list="articleStore.articleList"
          :width="240"
          :breakpoints="breakpoints"
          :gutter="30"
          animationEffect="animate__zoomIn"
          :hasAroundGutter="false"
          style="background-color: var(--container-bac-color);"
          :crossOrigin="false"
          :loadProps="loadProps"
      >
        <template #item="{ item }">
          <div class="card-item" @click="clickArticle(item.article_id)">
            <a href="#" class="preview">
              <LazyImg :url='item.imagesSrc[0]' class="lazy-img"></LazyImg>
            </a>
            <div class="footer">
              <a href="#" class="title-wrapper">
                <span class="title">{{item.title}}</span>
              </a>
              <div class="author-wrapper">
                <a href="#" class="author-msg">
                  <img :src="item.photo" alt="err">
                  <span>{{ item.user_name }}</span>
                </a>
                <span class="like-wrapper">
            <Star class="icon"></Star>
            <span class="count">{{ item.like_count }}</span>
          </span>
              </div>
            </div>
          </div>
        </template>
      </Waterfall>
    </div>
  </div>
</template>

<script setup>
import { Star} from '@element-plus/icons-vue'
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import { useArticleStore } from '../store/article'
import loadProps from '../const/loadProps'
import 'vue-waterfall-plugin-next/dist/style.css'

const breakpoints = {
  1600:{rowPerView:4},
  900:{rowPerView:3},
  700:{rowPerView:2},
  500:{rowPerView:1}
}


const articleStore = useArticleStore()
articleStore.loadArticle()
function clickArticle(articleId) {
  articleStore.readArticle(articleId)
}
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
    .card-item {
      .preview {
        width: 100%;
        .lazy-img {
          width: 100%;
          border-radius: 18px;
        }
      }
      .footer {
        padding: 12px;
        .title-wrapper {
          display: block;
          font-weight: 500;
          font-size: 14px;
          line-height: 140%;
          margin-bottom: 8px;
          color: var(--card-title-color);
        }
        .author-wrapper {
          display: flex;
          height: 20px;
          font-size: 12px;
          justify-content: space-between;
          .author-msg {
            display: flex;
            align-items: center;
            height: 100%;
            margin-right: 12px;
            img {
              height: 100%;
              margin-right: 6px;
              border-radius: 999px;
            }
            span {
              text-overflow: ellipsis;
              white-space: nowrap;
              color: var(--card-author-msg-color);
              &:hover {
                color: var(--card-author-msg-color-hover);
              }
            }
          }
          .like-wrapper {
            display: flex;
            align-items: center;
            color: var(--card-author-msg-color);
            cursor: pointer;
            .icon {
              height: 16px;
              width: 16px;
              &:hover {
                color: var(--card-author-msg-color-hover);
              }
            }
            .count {
              margin-left: 2px;
              &:hover {
                color: var(--card-author-msg-color-hover);
              }
            }
          }
        }
      }
    }
  }
}
</style>