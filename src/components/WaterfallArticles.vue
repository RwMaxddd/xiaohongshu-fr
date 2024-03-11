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
        <div class="card-item" @click.prevent="clickArticle(item.article_id)">
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
</template>

<script setup>
import { Star} from '@element-plus/icons-vue'
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import { useArticleStore } from '../store/article'
import { loadProps, breakpoints} from '../const/waterfallProps'
import 'vue-waterfall-plugin-next/dist/style.css'
import {toRef} from "vue";

// eslint-disable-next-line no-undef
const props = defineProps(['articleList'])
const articleList = toRef(props,'articleList')

const articleStore = useArticleStore()
function clickArticle(articleId) {
  articleStore.readArticle(articleId)
}
</script>

<style scoped lang="less">
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
</style>