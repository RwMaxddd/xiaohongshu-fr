import { defineStore } from 'pinia'
import { getArticles, getUserArticles, getExamineArticles, getOnlyArticle, searchArticles} from '../api/articles'
import { useCommentStore } from './comment'
import { useUserStore } from './user'

export const useArticleStore = defineStore('article', {
    state: () => {
        return {
            articleList:[],
            currentArticleId:-1,
            currentArticle:{},
            isInput:false,
            isRead:false,
            loading:true,
            page:1,
            pageSize:12,
            isEnding:false
        }
    },
    actions: {
        init() {
            this.$patch({
                articleList:[],
                currentArticleId:-1,
                currentArticle:{},
                // isInput:false,
                // isRead:false,
                // loading:true,
                page:1,
                pageSize:12,
                isEnding:false
            })
        },
        readArticle(articleId) {
            this.$patch((state) => {
                state.currentArticle = state.articleList.find((item) => item.article_id === articleId)
                state.currentArticleId = articleId
            })
            this.loading = false
            const commentStore = useCommentStore()
            commentStore.loadComments(articleId)
        },
        closeArticle() {
            const commentStore = useCommentStore()
            this.currentArticle={}
            this.$patch({
                currentArticleId: -1,
                isInput:false,
                isRead:false,
            })
            commentStore.closeComment()
        },
        activeInput() {
            this.isInput = true
        },
        cancleInput() {
            const commentStore = useCommentStore()
            this.isInput = false
            commentStore.cancelComment()
        },
        async loadOnlyArticle(articleId) {
            this.loading = true
            const data = await getOnlyArticle(articleId)
            this.articleList = data.data
            this.readArticle(articleId)
        },
        async loadArticle(type) {
            const userStore = useUserStore()
            if (!this.isEnding){
                const startIndex = this.pageSize * (this.page - 1)
                const data = await getArticles(userStore.userId,type,startIndex,this.pageSize)
                if (data.data.length < this.pageSize) {
                    this.isEnding = true
                }
                this.page += 1
                this.articleList.push(...data.data)
            }
        },
        async loadExamineArticles() {
            this.articleList = []
            const data = await getExamineArticles()
            this.articleList = data.data
        },
        async loadUserArticle(userId) {
            const data = await getUserArticles(userId)
            this.articleList = data.data
        },
        async loadSearchArticles(keyWord) {
            const data = await searchArticles(keyWord)
            this.articleList = data.data
        },
    },
})