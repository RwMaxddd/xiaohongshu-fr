import { defineStore } from 'pinia'
import { getArticles } from '../api/articles'
import { useCommentStore } from './comment'

export const useArticleStore = defineStore('article', {
    state: () => {
        return {
            articleList:[],
            currentArticleId:-1,
            currentArticle:{},
            isInput:false
        }
    },
    getters: {
        isRead: (state) => state.currentArticleId !== -1,
    },
    actions: {
        readArticle(articleId) {
            this.$patch((state) => {
                state.currentArticle = state.articleList.find((item) => item.article_id === articleId)
                state.currentArticleId = articleId
            })
            const commentStore = useCommentStore()
            commentStore.loadComments(articleId)
        },
        closeArticle() {
            const commentStore = useCommentStore()
            this.$patch({
                currentArticleId: -1,
                isInput:false,
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
        async loadArticle() {
            const data = await getArticles()
            this.articleList = data.data
        }
    },
})