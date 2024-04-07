import request from '../axios/index'

//根据文章id获取评论
export const getComments = (userId,articleId) => {
    return request.get('/getComments',{
        params: {
            article_id: articleId,
            user_id:userId
        },
    })
}
export const publishComment = (data) => {
    return request.post('/publishComment',data)
}
//点赞评论
export const agreeCommentApi = (likeData) => {
    return request.post('/agreeComments',likeData)
}
//取消点赞评论
export const cancelAgreeCommentsApi = (likeData) => {
    return request.post('/cancelAgreeComments',likeData)
}