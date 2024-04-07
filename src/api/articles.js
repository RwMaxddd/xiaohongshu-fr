import request from '../axios/index'

//获取文章
export const getArticles = (userId,type,startIndex,pageSize) => {
    return request.get('/getArticles',{
        params: {
            userId:userId,
            articleType:type,
            page:startIndex,
            pageSize:pageSize
        },
    })
}

//获取某用户发布的文章
export const getUserArticles = (userId,currentUserId) => {
    return request.get('/getUserArticles',{
        params: {
            currentUserId,
            userId: userId,
            page:0,
            pageSize:30
        },
    })
}

//获取审核中的文章
export const getExamineArticles = () => {
    return request.get('/getExamineArticles')
}
//通过审核文章
export const agreeArticles = (article_id) => {
    const data = {article_id}
    return request.patch('/agreeArticles',data)
}
export const getOnlyArticle = (userId,articleId) => {
    return request.get('/getOnlyArticle',{
        params: {
            userId: userId,
            articleId
        },
    })
}
//文章搜索提示
export const searchTips = (keyWord) => {
    return request.get('/searchTips',{
        params: {
            keyWord
        },
    })
}
//搜索特定文章
export const searchArticles = (keyWord,userId) => {
    return request.get('/searchArticles',{
        params: {
            keyWord,
            userId
        },
    })
}
//点赞文章
export const agreeArticleApi = (likeData) => {
    return request.post('/agreeArticles',likeData)
}
//取消点赞文章
export const cancelAgreeArticleApi = (likeData) => {
    return request.post('/cancelAgreeArticles',likeData)
}