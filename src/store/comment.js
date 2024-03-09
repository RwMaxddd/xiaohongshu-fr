import { defineStore } from 'pinia'
import { getComments } from '../api/comment'
import { publishComment } from '../api/comment'
import { useUserStore } from './user'
import { useArticleStore } from './article'
import { ElMessage } from 'element-plus'
import { getCurrentTimeString } from '../utils/time'


export const useCommentStore = defineStore('comment', {
    state: () => {
        return {
            commentList:[],
            parentId:0,
            replayId:0,
            userName:'',
            replayContent:'',
            loadingCommentList:false,
            loadingPublishComment:false
        }
    },
    actions: {
        async loadComments(articleId) {
            try {
                this.loadingCommentList = true
                const data = await getComments(articleId)
                this.loadingCommentList = false
                this.commentList = data.data
            }catch (e) {
                ElMessage.error('评论区数据获取失败')
                this.loadingCommentList = false
            }
        },
        clickCommentIcon(parent_id,replay_id,user_name,content){
            this.$patch({
                parentId: parent_id,
                replayId: replay_id,
                userName: user_name,
                replayContent:content,
            })
        },
        closeComment(){
            this.$patch({
                parentId: 0,
                replayId: 0,
                userName: '',
                replayContent:'',
                commentList:[]
            })
        },
        cancelComment(){
            this.$patch({
                parentId: 0,
                replayId: 0,
                userName: '',
                replayContent:'',
            })
        },
        async sendComment(inputContent){
            try {
                const userStore = useUserStore()
                const articleStore = useArticleStore()
                const nowTime = getCurrentTimeString()
                const commentData = {
                    publisher_id:userStore.userId,
                    article_id:articleStore.currentArticleId,
                    comment_time:nowTime,
                    content:inputContent,
                    parent_id:this.parentId,
                    replay_id:this.replayId,
                }
                this.loadingPublishComment = true
                await publishComment(commentData)
                this.loadingPublishComment = false
                await this.loadComments(articleStore.currentArticleId)
            }catch (e){
                ElMessage.error('评论发布失败')
                console.log(e.message)
            }
        }
    },
})