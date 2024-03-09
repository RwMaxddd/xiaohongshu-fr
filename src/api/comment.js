import request from '../axios/index'

//根据文章id获取评论
export const getComments = (articleId) => {
    return request.get('/getComments',{
        params: {
            article_id: articleId
        },
    })
}
export const publishComment = (data) => {
    return request.post('/publishComment',data)
}