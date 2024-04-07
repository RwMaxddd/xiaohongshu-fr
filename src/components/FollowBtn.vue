<template>
  <div class="follow-btn">
    <span v-if="!props.data" @click="follow">关注</span>
    <span v-else @click="cancelFollow">已关注</span>
  </div>
</template>

<script setup>
import { useArticleStore } from '../store/article'
import { useUserStore } from '../store/user'
import { getCurrentTimeString } from "../utils/time"
import { ElMessage } from 'element-plus'

// eslint-disable-next-line no-undef
const props = defineProps(['data'])
// eslint-disable-next-line no-undef
const emit = defineEmits(['handleFollow','cancelFollow'])
const articleStore = useArticleStore()
const userStore = useUserStore()

function follow() {
  if (userStore.userId) {
    const data = {
      userId:articleStore.articleList[articleStore.currentArticleIndex].author_id,
      currentUserId:userStore.userId,
      likeAt:getCurrentTimeString(),
    }
    emit('handleFollow',data)
  }else {
    ElMessage.error('未登录')
  }
}
function cancelFollow() {
  const data = {
    userId:articleStore.articleList[articleStore.currentArticleIndex].author_id,
    currentUserId:userStore.userId,
  }
  emit('cancelFollow',data)
}
</script>

<style scoped>
.follow-btn {
  color: rgb(255,255,255);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255,46,77);
  border-radius: 100px;
  height: 40px;
  width: 96px;
  padding: 0 24px 0 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}
</style>