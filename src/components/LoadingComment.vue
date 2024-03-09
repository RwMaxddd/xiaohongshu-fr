<template>
  <el-skeleton  animated :rows="3" :throttle="200" :loading="commentStore.loadingCommentList">
    <template v-slot:template>
      <div style="display: flex;margin-bottom: 14px" v-for="item in 4" :key="item">
        <el-skeleton style="--el-skeleton-circle-size: 40px;width: 40px;">
          <template #template>
            <el-skeleton-item variant="circle" />
          </template>
        </el-skeleton>
        <div style="display: flex;flex-direction: column;margin-left: 12px;width: 100%;">
          <el-skeleton-item variant="p" style="width: 70px;height: 18px;" />
          <el-skeleton-item variant="text" style="margin-top: 10px;height: 36px;" />
          <el-skeleton-item variant="text" style="margin-top: 10px;height: 18px; width: 90px" />
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup>
import { useCommentStore} from '../store/comment'

const commentStore = useCommentStore()
</script>

<style scoped lang="less">

</style>