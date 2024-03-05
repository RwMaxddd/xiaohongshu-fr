<template>
  <Transition name="modal">
    <div class="modal-mask" @click="closeArticle" v-show="articleStore.isRead">
      <div class="article" @click.stop>
        <div class="media-container">
          <el-carousel trigger="click" :autoplay="false">
            <el-carousel-item v-for="(item,index) in articleStore.currentArticle.imagesSrc" :key="index" class="carousel-item" :motion-blur="true">
              <img :src="item" alt="error">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="text-container">
          <div class="author-container">
            <div class="info">
              <a href="#" class="avatar">
                <img :src="articleStore.currentArticle.photo" alt="error">
              </a>
              <a href="#" class="name">
                <span>{{ articleStore.currentArticle.user_name }}</span>
              </a>
            </div>
            <div class="note-detail-follow-btn">
              <span>关注</span>
            </div>
          </div>
          <div class="note-scroller">
            <div class="note-content">
              <div class="title">
                <span>{{ articleStore.currentArticle.title }}</span>
              </div>
              <div class="desc">
                <span>{{ articleStore.currentArticle.content }}</span>
              </div>
              <div class="bottom-container">{{ articleStore.currentArticle.publish_time }}</div>
            </div>
            <div class="comments-el">
              <div class="comments-container" v-for="(parentComment,index) in commentStore.commentList" :key="index">
                <TheComment :dataObj="parentComment"></TheComment>
                <TheComment style="margin-left: 52px;margin-top: 10px" v-for="(leafComment,index) in parentComment.children" :key="index" :dataObj="leafComment"></TheComment>
              </div>
            </div>
          </div>
          <div class="publish-container" :class="{active:articleStore.isInput}">
            <div class="input-box">
              <el-input v-model="input" placeholder="Please input" @click="clickInput" :class="{active:articleStore.isInput}"/>
              <div class="buttons">
                <div class="item">
                  <Star class="icon"></Star>
                  <span class="count">1780</span>
                </div>
                <div class="item">
                  <ChatRound class="icon"></ChatRound>
                  <span class="count">1780</span>
                </div>
              </div>
            </div>
            <div class="bottom-box">
              <div class="right-btn-area">
                <div class="send-btn">
                  <span>发送</span>
                </div>
                <div class="cancel-btn" @click="cancleBtn">
                  <span>取消</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { useArticleStore } from '../store/article'
import { useCommentStore} from '../store/comment'
import { Star, ChatRound} from '@element-plus/icons-vue'
import TheComment from './TheComment'

const articleStore = useArticleStore()
const commentStore = useCommentStore()
function closeArticle() {
  articleStore.closeArticle()
}
function clickInput() {
  articleStore.activeInput()
}
function cancleBtn() {
  articleStore.cancleInput()
}


const input = ref('')
</script>

<style scoped lang="less">

.modal-mask {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity .3s ease;
  .article {
    display: flex;
    flex-shrink: 0;
    height: 700px;
    width: 950px;
    background-color: #FFFFFF;
    transition: all 0.3s ease;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    overflow: hidden;
    .media-container {
      flex-grow: 5;
      flex-shrink: 0;
      background-color: var(--media-container-bac-color);
      .carousel-item {
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
    .text-container {
      max-width: 430px;
      display: flex;
      flex-direction: column;
      position: relative;
      flex-grow: 4;
      .author-container {
        display: flex;
        justify-content: space-between;
        height: 88px;
        width: 100%;
        padding: 24px;
        background-color: var(--author-container-bac-color);
        .info {
          display: flex;
          align-items: center;
          .avatar {
            height: 100%;
            img {
              border-radius: 999px;
              height: 100%;
            }
          }
          .name {
            display: flex;
            align-items: center;
            height: 100%;
            font-size: 16px;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-left: 12px;
            color: var(--article-user-name-color);
          }
        }
        .note-detail-follow-btn {
          color: rgb(255,255,255);
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgb(255,46,77);
          border-radius: 100px;
          height: 100%;
          width: 96px;
          padding: 0 24px 0 24px;
          font-size: 16px;
          font-weight: 600;
        }
      }
      .note-scroller {
        flex-grow: 1;
        background-color: var(--nomal-background-color);
        overflow-y: auto;
        .note-content {
          padding: 0 24px 24px 24px;
          border-bottom: 1px solid var(--publish-container-border-color);
          .title {
            margin-bottom: 8px;
            font-weight: 600;
            font-size: 18px;
            line-height: 18px;
            line-height: 140%;
            color: var(--article-title-color);
            white-space: pre-wrap;
            overflow-wrap: break-word;
          }
          .desc {
            font-weight: 400;
            font-size: 16px;
            white-space: pre-wrap;
            overflow-wrap: break-word;
            line-height: 16px;
            line-height: 150%;
            color: var(--article-title-color);
          }
          .bottom-container {
            margin-top: 12px;
            font-size: 14px;
            line-height: 120%;
            color: var(--articlebottom-container-color);
          }
        }
        .comments-el{
          padding: 24px;
          .comments-container {
            margin-bottom: 10px;
          }
        }
      }
      .publish-container {
        position: absolute;
        width: 100%;
        //height: 120px;
        padding: 16px 16px 0 16px;
        bottom: 0;
        background-color: var(--publish-container-bac-color);
        transform: translateY(56px);
        transition: all .3s ease;
        border-top: 1px solid var(--publish-container-border-color);
        overflow: hidden;
        .input-box {
          height: 40px;
          display: flex;
          margin-bottom: 8px;
          overflow: hidden;
          .buttons {
            flex-shrink: 0;
            height: 100%;
            display: flex;
            align-items: center;
            .item {
              display: flex;
              padding: 0 8px 0 8px;
              align-items: center;
              color: var(--article-buttom-icon-color);
              cursor: pointer;
              .icon {
                height: 24px;
                width: 24px;
              }
              .count {
                margin-left: 4px;
                font-weight: 500;
                font-size: 14px;
              }
            }
          }
          .el-input {
            flex-shrink: 0;
            height: 100%;
            width: 48%;
            border-radius: 20px;
            transition: width .3s ease;
          }
          .el-input.active {
            width: 100%;
          }
        }
        .bottom-box {
          height: 56px;
          display: flex;
          .right-btn-area {
            display: flex;
            width: 100%;
            justify-content: right;
            .send-btn,.cancel-btn {
              width: 64px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              font-weight: 600;
              font-size: 16px;
              border-radius: 44px;
              margin-left: 8px;
              background-color: var(--article-cancel-btn-bac-color);
              cursor: pointer;
            }
            .send-btn {
              color: #fff;
              background-color: rgb(61,138,245);
            }
            .cancel-btn {
              color: var(--article-cancel-btn-color);
              border: 1px solid var(--color-border);
              &:hover {
                background-color: var(--article-cancel-btn-bac-color-hover);
              }
            }
          }
        }
      }
      .publish-container.active {
        transform: translateY(0px);
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
.modal-enter-from .article,
.modal-leave-to .article {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
<style lang="less">
.el-carousel {
  height: 100%;
}
.article .el-carousel__container {
  height: 100%;
}
.el-input__wrapper {
  border-radius: 20px;
}
.article {
  .el-input__wrapper {
    padding: 0;
    border-radius: 999px;
    overflow: hidden;
    box-shadow: none;
    .el-input__inner {
      font-size: 16px;
      color: var(--input-color);
      background: var(--article-input-bac-color);
      padding: 0 84px 0 16px;
      height: 100%;
    }
  }
}
</style>