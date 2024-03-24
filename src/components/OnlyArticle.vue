<template>
  <div class="only">
    <div v-if="articleStore.loading" style="width: 100%;height: 200px;display: flex;justify-content: center;padding-top: 50px;transform: translateY(200px)">
      <div class="loader"></div>
    </div>
    <div class="article" v-else>
      <div class="media-container">
        <el-carousel trigger="click" :autoplay="false">
          <el-carousel-item v-for="(item,index) in articleStore.currentArticle.imagesSrc" :key="index" class="carousel-item" :motion-blur="true">
            <img :src="item" alt="error">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="text-container">
        <div class="author-container">
          <div class="info" @click.prevent="toUser(articleStore.currentArticle.author_id)">
            <a href="#" class="avatar">
              <img :src="articleStore.currentArticle.photo" alt="error">
            </a>
            <a href="#" class="name">
              <span>{{ articleStore.currentArticle.user_name }}</span>
            </a>
          </div>
          <FollowBtn></FollowBtn>
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
            <LoadingComment></LoadingComment>
            <div v-show="!commentStore.loadingCommentList">
              <div class="comments-container" v-for="(parentComment,index) in commentStore.commentList" :key="index">
                <TheComment :dataObj="parentComment"></TheComment>
                <TheComment style="margin-left: 52px;margin-top: 10px" v-for="(leafComment,index) in parentComment.children" :key="index" :dataObj="leafComment"></TheComment>
              </div>
            </div>
          </div>
        </div>
        <div class="publish-container" :class="{active:articleStore.isInput}">
          <div class="reply-content" v-show="commentStore.userName">
            <span class="replay">{{ commentStore.userName }}</span>
            <span class="content">{{ commentStore.replayContent }}</span>
          </div>
          <div class="input-box">
            <el-input v-model="input" placeholder="Please input" @click="clickInput" :class="{active:articleStore.isInput}"/>
            <div class="buttons">
              <div class="item">
                <Star class="icon"></Star>
                <span class="count">{{ articleStore.currentArticle.like_count }}</span>
              </div>
              <div class="item">
                <ChatRound class="icon"></ChatRound>
                <span class="count">{{ articleStore.currentArticle.comment_count }}</span>
              </div>
              <div class="item">
                <Link class="icon" v-if="!isLink" @click="copyArticleLink"></Link>
                <Check class="icon" v-if="isLink"></Check>
              </div>
            </div>
          </div>
          <div class="bottom-box">
            <div class="right-btn-area">
              <div class="send-btn" @click="publishComment">
                <div class="loader" v-show="commentStore.loadingPublishComment"></div>
                <span v-show="!commentStore.loadingPublishComment">发送</span>
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
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '../store/article'
import { useUserStore } from '../store/user'
import { useCommentStore} from '../store/comment'
import { Star, ChatRound, Link, Check} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import TheComment from './TheComment'
import LoadingComment from './LoadingComment'
import FollowBtn from './FollowBtn'

const articleStore = useArticleStore()
const commentStore = useCommentStore()
const input = ref('')
const isLink = ref(false)
function copyArticleLink() {
  isLink.value = true
  const articleUrl = `http://localhost:8080/#/TheGlobal/Article/${articleStore.currentArticle.article_id}`
  navigator.clipboard.writeText(articleUrl)
      .then(() => {
        ElMessage({
          message: '复制成功，快去分享给好友吧',
          type: 'success',
        })
      })
      .catch(err => {
        isLink.value = false
        ElMessage.error(err.message)
      });
}

const route = useRoute()
articleStore.loadOnlyArticle(Number(route.params.articleId))

function clickInput() {
  articleStore.activeInput()
}
function cancleBtn() {
  articleStore.cancleInput()
  input.value = ''
}

const userStore = useUserStore()
function publishComment() {
  if (!articleStore.currentArticle.examine) {
    ElMessage.error('该帖子目前正在审核中')
  }
  else if (userStore.userId === ''){
    ElMessage.error('未登录')
  }
  else if (input.value === '') {
    ElMessage.error('输入内容不能为空')
  }
  else {
    commentStore.sendComment(input.value)
  }
}

const router = useRouter()
function toUser(userId){
  let routeUrl = router.resolve({
    name:'user',
    params: { id: userId },
  });
  window.open(routeUrl.href, '_blank');
}
</script>

<style scoped lang="less">
.loader {
  height: 15px;
  aspect-ratio: 4;
  --_g: no-repeat radial-gradient(farthest-side,#000 90%,#0000);
  background:
      var(--_g) left,
      var(--_g) right;
  background-size: 25% 100%;
  display: grid;
}
.loader:before,
.loader:after {
  content: "";
  height: inherit;
  aspect-ratio: 1;
  grid-area: 1/1;
  margin: auto;
  border-radius: 50%;
  transform-origin: -100% 50%;
  background: #000;
  animation: l49 1s infinite linear;
}
.loader:after {
  transform-origin: 200% 50%;
  --s:-1;
  animation-delay: -.5s;
}

@keyframes l49 {
  58%,
  100% {transform: rotate(calc(var(--s,1)*1turn))}
}
.only {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 16px;
  background-color: var(--side-bar-bac-color);
  .article {
    display: flex;
    flex-shrink: 1;
    height: 640px;
    width: 950px;
    background-color: var(--side-bar-bac-color);
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
      }
      .note-scroller {
        height: calc(100% - 88px - 64px);
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
        padding: 16px 16px 0 16px;
        bottom: 0;
        background-color: var(--publish-container-bac-color);
        transform: translateY(56px);
        transition: all .3s ease;
        border-top: 1px solid var(--publish-container-border-color);
        overflow: hidden;
        .reply-content {
          display: flex;
          flex-direction: column;
          font-size: 14px;
          margin-bottom: 12px;
          padding: 0 16px;
          line-height: 16px;
          .replay {
            color: var(--articlebottom-container-color);
          }
          .content {
            color: var(--article-title-color);
            margin-top: 4px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
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
            width: 56%;
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
</style>