import { defineStore } from 'pinia'
import { getArticles, getUserArticles, getExamineArticles, getOnlyArticle} from '../api/articles'
import { useCommentStore } from './comment'

export const useArticleStore = defineStore('article', {
    state: () => {
        return {
            articleList:[],
            currentArticleId:-1,
            currentArticle:{},
            isInput:false,
            isRead:false,
            loading:true
        }
    },
    actions: {
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
            this.$patch({
                currentArticleId: -1,
                isInput:false,
                isRead:false,
                currentArticle:{}
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
            this.articleList = []
            const data = await getOnlyArticle(articleId)
            this.articleList = data.data
            this.readArticle(articleId)
        },
        async loadArticle(type) {
            this.articleList = []
            const data = await getArticles(type)
            this.articleList = data.data
        },
        async loadExamineArticles() {
            this.articleList = []
            const data = await getExamineArticles()
            this.articleList = data.data
        },
        async loadUserArticle(userId) {
            this.articleList = []
            const data = await getUserArticles(userId)
            this.articleList = data.data
        }
    },
})