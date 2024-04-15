<template>
  <div class="admin">
    <el-table :data="articleStore.articleList" style="width: 100%;z-index: 0">
      <el-table-column label="文章ID" width="80">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span >{{ scope.row.article_id }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="220">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.publish_time }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span >{{ scope.row.user_name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="文章标题" width="250">
        <template #default="scope">
          <div style="display: flex; align-items: center;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
            <span>{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="文章类型" width="100">
        <template #default="scope">
          <div style="display: flex; align-items: center;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
            <span>{{ typeObj[scope.row.type] }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row.article_id)" style="margin-right: 12px"
          >查看</el-button
          >
          <el-button
              size="small"
              type="success"
              @click="handleAgree(scope.$index, scope.row.article_id)"
          >通过</el-button
          >
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
          >拒绝</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { Timer } from '@element-plus/icons-vue'
import { useArticleStore } from '../store/article'
import { agreeArticles } from '../api/articles'

const typeObj = {
  discuss:'讨论',
  popularization:'科普',
  activity:'活动',
}
const articleStore = useArticleStore()
articleStore.loadExamineArticles()
const handleEdit = (article_id) => {
  articleStore.isRead = true
  articleStore.readArticle(article_id)
}
const handleAgree = async (index, article_id) => {
  try {
    await agreeArticles(article_id)
    articleStore.articleList.splice(index,1)
  }catch (e){
    console.log(e)
  }
}
const handleDelete = (index) => {
  articleStore.articleList.splice(index,1)
}

</script>

<style scoped lang="less">
.admin {
  width: 100%;
  height: 100%;
  background-color: var(--container-bac-color);
  padding: 16px 32px 0 32px;
  overflow: auto;
}
</style>
<style lang="less">
.admin {
  .el-button+.el-button {
    margin: 0 12px 0 0;
  }
  .el-table thead {
    color: var(--article-title-color);
  }
  .el-table th.el-table__cell {
    background-color: var(--side-bar-bac-color);
  }
  .el-table tr {
    background-color: var(--side-bar-bac-color);
  }
  .el-table {
    color: var(--article-title-color);
    --el-table-row-hover-bg-color:var(--side-bar-item-background-color-hover);
  }
}

</style>