<template>
  <div class="comment">
    <div class="avatar">
      <a href="#">
        <img :src="photo" alt="error">
      </a>
    </div>
    <div class="right">
      <span class="author">{{ user_name }}</span>
      <span class="content">
        <span class="replay-tip" v-show="replay_name">
          回复
          <span class="replay-name">
            {{ replay_name }}
          </span>:
        </span>
        {{ content }}
      </span>
      <div class="info">
        <span class="date">{{comment_time}}</span>
        <div class="interactions">
          <div class="like">
            <icon-heart style="font-size: 16px" v-if="!isLike" @click="agreeComment"/>
            <icon-heart-fill style="font-size: 16px;color: rgb(255,36,66)" @click="cancelAgreeComment" v-else/>
            <span class="count">{{ like_count }}</span>
          </div>
          <div class="replay" @click="clickComment(parent_id,comment_id,user_name,content)">
            <ChatRound class="icon"></ChatRound>
            <span class="count" v-if="parent_id === 0">{{ props.dataObj.replay_count }}</span>
            <span class="count" v-else>回复</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChatRound} from '@element-plus/icons-vue'
import { useCommentStore } from '../store/comment'
import { useArticleStore } from '../store/article'
import { useUserStore } from '../store/user'
import { IconHeart, IconHeartFill } from '@arco-design/web-vue/es/icon';
import {ref, toRefs} from "vue";
import {getCurrentTimeString} from "@/utils/time";
import { agreeCommentApi, cancelAgreeCommentsApi } from "../api/comment";
import {ElMessage} from "element-plus";

// eslint-disable-next-line no-undef
const props = defineProps(['dataObj'])
const {user_name, photo, comment_time, content, parent_id, comment_id, replay_name} = toRefs(props.dataObj)
const like_count = ref(props.dataObj.like_count)
const isLike = ref(props.dataObj.isLike)
const userStore = useUserStore()
let likeCommentId = ref(props.dataObj.like_id)

async function agreeComment() {
  if (userStore.isLogin){
    isLike.value = true
    like_count.value += 1
    const likeData = {
      userId:userStore.userId,
      commentId:comment_id.value,
      likedAt:getCurrentTimeString(),
    }
    try {
      const likeId = (await agreeCommentApi(likeData)).likeId
      likeCommentId.value = likeId
    }catch (e) {
      ElMessage.error(e.message)
    }
  }else {
    ElMessage.error('未登录')
  }
}
async function cancelAgreeComment() {
  if (userStore.isLogin){
    isLike.value = false
    like_count.value -= 1
    if (likeCommentId.value !== -1){
      const cancelData = {
        commentId:comment_id.value,
        likeId:likeCommentId.value,
      }
      try {
        await cancelAgreeCommentsApi(cancelData)
      }catch (e) {
        ElMessage.error(e.message)
      }
    }
  }else {
    ElMessage.error('未登录')
  }
}

function clickComment(parent_id,comment_id,user_name,content){
  const pId = parent_id === 0 ? comment_id : parent_id;
  const commentStore = useCommentStore()
  const articleStore = useArticleStore()
  articleStore.activeInput()
  commentStore.clickCommentIcon(pId,comment_id,user_name,content)
}
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
      .replay-tip {
        .replay-name {
          margin-left: 4px;
          color: var(--articlebottom-container-color);
        }
      }
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