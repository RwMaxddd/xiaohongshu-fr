<template>
  <div class="comment">
    <div class="avatar">
      <a href="#">
        <img :src="props.dataObj.photo" alt="error">
      </a>
    </div>
    <div class="right">
      <span class="author">{{ props.dataObj.user_name }}</span>
      <span class="content">{{ props.dataObj.content }}</span>
      <div class="info">
        <span class="date">{{props.dataObj.comment_time}}</span>
        <div class="interactions">
          <div class="like">
            <Star class="icon"></Star>
            <span class="count">{{ props.dataObj.like_count }}</span>
          </div>
          <div class="replay">
            <ChatRound class="icon"></ChatRound>
            <span class="count">{{ props.dataObj.like_count }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Star, ChatRound} from '@element-plus/icons-vue'

// eslint-disable-next-line no-undef
const props = defineProps(['dataObj'])
</script>

<style scoped lang="less">
.comment {
  display: flex;
  .avatar {
    a img {
      height: 40px;
      width: 40px;
      border-radius: 100%;
      object-fit: cover;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
    font-size: 14px;
    .author {
      line-height: 18px;
      color: var(--articlebottom-container-color);
      cursor: pointer;
      &:hover {
        color: var(--color-secondary-label);
      }
    }
    .content {
      margin-top: 4px;
      line-height: 140%;
      color: var(--article-title-color);
    }
    .info {
      display: flex;
      flex-direction: column;
      .date {
        font-size: 12px;
        line-height: 16px;
        margin: 8px 0 8px 0;
        color: var(--articlebottom-container-color);
      }
      .interactions {
        display: flex;
        font-size: 12px;
        line-height: 16px;
        .like,.replay {
          display: flex;
          align-items: center;
          color: var(--color-secondary-label);
          cursor: pointer;
          .icon {
            height: 16px;
            width: 16px;
          }
          .count {
            margin-left: 2px;
            font-weight: 500;
          }
          &:hover {
            color: var(--color-secondary-label-hover);
          }
        }
        .replay {
          margin-left: 8px;
        }
      }
    }
  }
}
</style>