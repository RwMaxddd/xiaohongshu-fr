<template>
  <div class="waterfall-box">
    <Waterfall
        :list="articleList"
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
        <div class="card-item" @click.prevent="clickArticle(item.article_id)" v-if="item.examine || userStore.userId === $route.params.id">
          <a href="#" class="preview">
            <LazyImg :url='item.imagesSrc[0]' class="lazy-img"></LazyImg>
            <div class="activityTip" v-if="item.type === 'activity'">
              <span class="finish" v-if="item.activity_status === 'finish'">已结束</span>
              <span class="underway" v-else-if="item.activity_status === 'underway'">进行中</span>
              <span class="not-started" v-else>未开始</span>
            </div>
            <div class="mask" v-if="!item.examine">
              <span>审核中</span>
            </div>
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
            <icon-heart style="font-size: 16px" v-if="!item.isLike"/>
            <icon-heart-fill style="font-size: 16px;color: rgb(255,36,66)" v-else/>
            <span class="count">{{ item.like_count }}</span>
          </span>
            </div>
          </div>
        </div>
      </template>
    </Waterfall>
  </div>
</template>

<script setup>
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import { useArticleStore } from '../store/article'
import { useUserStore } from '../store/user'
import { loadProps, breakpoints} from '../const/waterfallProps'
import 'vue-waterfall-plugin-next/dist/style.css'
import {toRef} from "vue";
import { IconHeart, IconHeartFill } from '@arco-design/web-vue/es/icon';

// eslint-disable-next-line no-undef
const props = defineProps(['articleList'])
const articleList = toRef(props,'articleList')

const articleStore = useArticleStore()
const userStore = useUserStore()
function clickArticle(articleId) {
  articleStore.isRead = true
  articleStore.readArticle(articleId)
}
</script>

<style scoped lang="less">
.card-item {
  .preview {
    width: 100%;
    position: relative;
    .lazy-img {
      width: 100%;
      border-radius: 18px;
    }
    .activityTip {
      position: absolute;
      display: flex;
      top: 10px;
      left: 4%;
      color: white;
      span {
        border-radius: 6px;
        padding: 5px 8px;
      }
      .not-started {
        background-color: rgb(134,144,156);
      }
      .underway {
        background-color: rgb(103,194,58);
      }
      .finish {
        background-color: rgb(245,63,63);
      }
    }
    .mask {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,.5);
      border-radius: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-weight: 600;
        font-size: 24px;
        line-height: 120%;
        color: #FFFFFF;
      }
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
</style>