<template>
  <Transition name="modal">
    <div class="modal-mask" @click="closeForm" v-show="userStore.isShowModifyForm">
      <div class="modify-box" @click.stop>
        <div class="modify">
          <div class="header">
            <div class="left-box">
              <span class="icon" @click="closeForm">
                <Close style="height: 26px;width: 26px"></Close>
              </span>
              <span class="text">编辑个人资料</span>
            </div>
            <div class="right-box">
              <div class="save-btn" @click="submitNewUserInfo">
                <span>保存</span>
              </div>
            </div>
          </div>
          <div class="form">
            <div class="ava">
              <a-space direction="vertical" :style="{ width: '100%' }">
                <a-upload
                    action="/"
                    :auto-upload="false"
                    :fileList="file ? [file] : []"
                    :show-file-list="false"
                    @change="onChange"
                    @progress="onProgress"
                >
                  <template #upload-button>
                    <div
                        :class="`arco-upload-list-item${
            file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
          }`"
                    >
                      <div
                          class="arco-upload-list-picture custom-upload-avatar"
                          v-if="file && file.url"
                          style="border-radius: 50%"
                      >
                        <img :src="file.url" style="object-fit: cover"/>
                        <div class="arco-upload-list-picture-mask">
                          <IconEdit />
                        </div>
                        <a-progress
                            v-if="file.status === 'uploading' && file.percent < 100"
                            :percent="file.percent"
                            type="circle"
                            size="mini"
                            :style="{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
              }"
                        />
                      </div>
                      <div
                          class="arco-upload-list-picture custom-upload-avatar"
                          v-else
                          style="border-radius: 50%"
                      >
                        <img :src="props.photo" style="object-fit: cover"/>
                        <div class="arco-upload-list-picture-mask">
                          <IconEdit />
                        </div>
                      </div>
                    </div>
                  </template>
                </a-upload>
              </a-space>
            </div>
            <div class="upload-textarea">
              <el-input
                  v-model="title"
                  placeholder="昵称"
                  class="title"
                  maxlength="30"
                  show-word-limit/>
              <el-input
                  v-model="textarea"
                  :rows="2"
                  type="textarea"
                  placeholder="简介"
                  class="textarea"
                  maxlength="150"
                  show-word-limit
                  :autosize="{ minRows: 3, maxRows: 6 }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useUserStore } from '../store/user'
import { Close } from '@element-plus/icons-vue'
import { IconEdit, } from '@arco-design/web-vue/es/icon';
import {ElMessage} from "element-plus";
import {ref, watch} from "vue";
import { updateUserInfo } from "../api/user";

// eslint-disable-next-line no-undef
const props = defineProps(['user_name','intro','photo','user_id'])

const userStore = useUserStore()
function closeForm() {
  userStore.isShowModifyForm = false
}
const title = ref('')
const textarea = ref('')
watch(() => props.user_name,(newValue) => {
  title.value = newValue
})
watch(() => props.intro,(newValue) => {
  textarea.value = newValue
})

const file = ref();
const onChange = (_, currentFile) => {
  file.value = {
    ...currentFile,
  };
};
const onProgress = (currentFile) => {
  file.value = currentFile;
};

async function submitNewUserInfo() {
  try {
    const formData = new FormData()
    formData.append('user_name',title.value)
    formData.append('intro',textarea.value)
    formData.append('user_id',props.user_id)
    if (file.value){
      formData.append('file',file.value.file)
    }
    await updateUserInfo(formData)
    ElMessage({
      message: '修改个人信息成功',
      type: 'success',
    })
    window.location.reload();
  }catch (e) {
    ElMessage.error(e.message)
  }
}
</script>

<style scoped lang="less">
.modal-mask {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all .3s ease;
  .modify-box {
    transition: all 0.3s ease;
    .modify {
      width: 500px;
      height: 550px;
      border-radius: 20px;
      background-color: var(--side-bar-bac-color);
      transition: all 0.3s ease;
      padding: 0 16px 0 16px;
      overflow: hidden;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 53px;
        .left-box {
          display: flex;
          height: 100%;
          align-items: center;
          color: var(--article-title-color);
          margin-right: 20px;
          .icon {
            cursor:pointer;
          }
          .text {
            font-weight: 600;
            font-size: 16px;
            margin-left: 30px;
          }
        }
        .right-box {
          height: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;
          .save-btn {
            color: rgb(255,255,255);
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgb(255,46,77);
            border-radius: 100px;
            height: 35px;
            width: 80px;
            padding: 0 12px 0 12px;
            font-size: 16px;
            font-weight: 600;
          }
        }
      }
      .form {
        .ava {
          margin-bottom: 20px;
        }
        .upload-textarea {
          display: flex;
          align-items: center;
          flex-direction: column;
          .title {
            width: 100%;
          }
          .textarea {
            width: 100%;
            margin: 12px 0 12px 0;
          }
        }
      }
    }
  }
}
.modal-enter-from {
  opacity: 0;
}
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modify-box,
.modal-leave-to .modify-box {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

<style>
.modify .arco-upload-picture-card {
  border: none;
  border-radius: 50%;
}
.modify .arco-space-item {
  display: flex;
  justify-content: center;
}
.modify .arco-upload-list-picture {
  height: 110px;
  width: 110px;
}
.modify .arco-upload-list-picture-mask {
  line-height: 110px;
}
.modify .el-textarea__inner,
.modify .el-textarea .el-input__count,
.modify .el-input__wrapper,
.modify .el-input .el-input__count .el-input__count-inner,
.modify .el-input__inner{
  color: var(--input-color);
  background-color: var(--upload-testarea-bac-color);
}
.modify .el-input__wrapper {
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>