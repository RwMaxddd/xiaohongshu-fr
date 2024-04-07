import { defineStore } from 'pinia'
import { getArticles, getUserArticles, getExamineArticles, getOnlyArticle, searchArticles} from '../api/articles'
import { useCommentStore } from './comment'
import { useUserStore } from './user'

export const useArticleStore = defineStore('article', {
    state: () => {
        return {
            articleList:[],
            currentArticleId:-1,
            currentArticleIndex:-1,
            isInput:false,
            isRead:false,
            onlyIsRead:false,
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
                isInput:false,
                // isRead:false,
                // loading:true,
                page:1,
                pageSize:12,
                isEnding:false
            })
        },
        readArticle(articleId) {
            this.$patch((state) => {
                state.currentArticleIndex = state.articleList.findIndex((item) => item.article_id === articleId)
                state.currentArticleId = articleId
            })
            this.loading = false
            const commentStore = useCommentStore()
            commentStore.loadComments(articleId)
        },
        closeArticle() {
            const commentStore = useCommentStore()
            this.currentArticleIndex=-1
            this.$patch({
                currentArticleId: -1,
                isInput:false,
                isRead:false,
                onlyIsRead:false,
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
        async loadOnlyArticle(userId,articleId) {
            this.loading = true
            const data = await getOnlyArticle(userId,articleId)
            this.articleList = data.data
            this.onlyIsRead = true
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
            const userStore = useUserStore()
            const data = await getUserArticles(userId,userStore.userId)
            this.articleList = data.data
        },
        async loadSearchArticles(keyWord) {
            const userStore = useUserStore()
            const data = await searchArticles(keyWord,userStore.userId)
            this.isEnding = true
            this.articleList = data.data
        },
    },
})