<template>
  <div class="publish">
    <div class="upload-container">
      <div class="header">
        <span class="header-title">发布图文</span>
      </div>
      <div class="content">
        <div class="upload-img">
          <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :on-exceed="handleExceed"
              :on-change="handleChange"
              v-model:file-list="fileList"
              :limit="9"
          >
            <el-icon class="plus"><Plus /></el-icon>
            <template #file="{ file }">
              <div class="preview">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
          <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
          >
            <el-icon><ZoomIn /></el-icon>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
              </div>
            </template>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </div>
        <div class="upload-textarea">
          <el-input
              v-model="title"
              placeholder="填写标题，可能会有更多赞哦～"
              class="title"
              maxlength="40"
              show-word-limit/>
          <el-input
              v-model="textarea"
              :rows="2"
              type="textarea"
              placeholder="填写更全面的描述信息，让更多的人看到你吧！"
              class="textarea"
              maxlength="1000"
              show-word-limit
              :autosize="{ minRows: 4, maxRows: 10 }"
          />
          <div class="button">
            <el-button type="danger" @click="handleSubmit">发布</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import { getCurrentTimeString } from '../utils/time'
import { publishArticle } from '../api/upload'
import { useUserStore } from '../store/user'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const fileList = ref([])

const title = ref('')
const textarea = ref('')

const handleRemove = (file) => {
  console.log(fileList.value)
  const deleteIndex = fileList.value.findIndex(item => item.name === file.name)
  fileList.value.splice(deleteIndex,1)
}
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}
const handleChange = (uploadFile) => {
  if (uploadFile.raw.type !== 'image/jpeg'){
    ElMessage.error('必须为JPG格式图片!')
    fileList.value.splice(-1,1)
    return;
  }
  if (uploadFile.size / 1024 / 1024 > 2){
    ElMessage.error('图片大小不得大于2MB!')
    fileList.value.splice(-1,1)
    return;
  }
}
const handleExceed= () => {
  ElMessage.error('最多上传9张图片')
}
async function handleSubmit(){
  const formData = new FormData()
  const userStore = useUserStore()
  const userId = userStore.userId
  formData.append('userId',userId)
  formData.append('title',title.value)
  formData.append('content',textarea.value)
  formData.append('time',getCurrentTimeString())
  for (const file of fileList.value) {
    formData.append('pictures',file.raw)
  }
  try {
    const value = await publishArticle(formData)
    ElMessage({
      message: value.msg,
      type: 'success',
    })
    location.reload()
  }catch (e) {
    if (e.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      ElMessage.error(e.response.data.msg)
    }else {
      // 发送请求时出了点问题
      ElMessage.error(e.message)
    }
  }
}

</script>

<style scoped lang="less">
.el-upload-list__item-thumbnail{
  height: 100%;
  object-fit: cover;
}
.el-dialog-img{
  height: 100%;
  width: 100%;
}
.preview{
  height: 100%;
  width: 100%;
}
.publish {
  height: 100%;
  padding: 16px 32px 16px 32px;
  background-color: var(--publish-bac-color);
  .upload-container {
    height: 100%;
    padding: 28px 24px 28px 24px;
    border-radius: 20px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    background-color: var(--upload-container-bac-color);
    .header {
      margin-bottom: 24px;
      .header-title {
        font-size: 20px;
        font-weight: 600;
        color: var(--aside-icon-color);
      }
    }
    .content {
      padding-left: 13px;
      .upload-img {
        margin-bottom: 12px;
      }
      .upload-textarea {
        .title {
          width: 70%;
        }
        .textarea {
          width: 70%;
          margin: 12px 0 12px 0;
        }
      }
    }
  }
}
</style>

<style>
body .publish .el-upload-list--picture-card .el-upload-list__item,
.el-upload--picture-card{
  height: 94px;
  width: 94px;
  background-color: var(--upload-img-icon-bac-color);
}
.publish .el-dialog__body img {
  width: 100%;
}
.publish .el-textarea__inner,
.publish .el-textarea .el-input__count,
.publish .el-input__wrapper,
.publish .el-input .el-input__count .el-input__count-inner,
.publish .el-input__inner{
  color: var(--input-color);
  background-color: var(--upload-testarea-bac-color);
}
.publish .el-input__wrapper {
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>