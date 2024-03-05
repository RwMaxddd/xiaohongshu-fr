import { defineStore } from 'pinia'
import { getComments } from '../api/comment'

export const useCommentStore = defineStore('comment', {
    state: () => {
        return {
            commentList:[],
        }
    },
    actions: {
        async loadComments(articleId) {
            const data = await getComments(articleId)
            this.commentList = data.data
        },
    },
})