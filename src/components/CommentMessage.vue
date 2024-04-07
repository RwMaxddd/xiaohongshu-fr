<template>
  <div class="comment-message">
    <div class="messageItem" v-for="(item,index) in infoData" :key="index">
      <div class="left">
        <img :src="item.photo" alt="error" @click="toUser(item.publisher_id)">
      </div>
      <div class="right">
        <div class="info">
          <span class="user-name" @click="toUser(item.publisher_id)">{{ item.user_name }}</span>
          <div class="text">
            <span v-if="!item.reply">评论了你的文章</span>
            <span v-else>回复了你的评论</span>
            <span>{{ item.comment_time }}</span>
          </div>
          <span class="replay">{{ item.content }}</span>
          <span class="comment" v-if="item.reply" @click="toArticle(item.article_id)">
            {{ item.reply }}
          </span>
        </div>
        <img :src="item.preview_img" alt="error" @click="toArticle(item.article_id)">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getCommentInform} from "../api/inform"
import { useUserStore } from '../store/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const infoData = ref([])

loadCommentInform()
async function loadCommentInform() {
  try {
    const data = (await getCommentInform(userStore.userId)).data
    infoData.value.push(...data)
  }catch (e) {
    console.log(e)
    ElMessage.error(e.message)
  }
}
function toUser(userId){
  let routeUrl = router.resolve({
    name:'user',
    params: { id: userId },
  });
  window.open(routeUrl.href, '_blank');
}
function toArticle(articleId){
  let routeUrl = router.resolve({
    name:'article',
    params: { articleId: articleId },
  });
  window.open(routeUrl.href, '_blank');
}
</script>

<style scoped lang="less">
.comment-message {
  .messageItem {
    display: flex;
    background-color: #FFFFFF;
    background-color: var(--side-bar-bac-color);
    padding-top: 24px;
    .left {
      margin-right: 24px;
      flex-shrink: 0;
      img {
        height: 48px;
        width: 48px;
        border-radius: 50%;
        object-fit: cover;
        cursor:pointer;
      }
    }
    .right {
      flex-grow: 1;
      display: flex;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--publish-container-border-color);
      .info {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        .user-name {
          align-self: start;
          font-size: 16px;
          color: var(--article-title-color);
          font-weight: 600;
          cursor:pointer;
        }
        .text {
          font-size: 14px;
          color: var(--articlebottom-container-color);
          margin-top: 6px;
          display: flex;
          span {
            margin-right: 12px;
          }
        }
        .replay {
          margin-top: 6px;
          font-size: 14px;
          color: var(--article-title-color);
        }
        .comment {
          display: flex;
          align-items: center;
          font-size: 12px;
          margin-top: 6px;
          color: var(--articlebottom-container-color);
          cursor:pointer;
          &::before {
            content: "";
            border-radius: 8px;
            margin-right: 6px;
            width: 4px;
            height: 18px;
            background-color: var(--comment-bac-color);
          }
        }
      }
      img {
        margin-left: 12px;
        height: 48px;
        width: 48px;
        border-radius: 8px;
        object-fit: cover;
        cursor:pointer;
      }
    }
  }
}
</style>