import request from '../axios/index'

//获取文章
export const getArticles = () => {
    return request.get('/getArticles?page=0&pageSize=30')
}

//获取某用户发布的文章
export const getUserArticles = (userId) => {
    return request.get('/getUserArticles',{
        params: {
            userId: userId,
            page:0,
            pageSize:30
        },
    })
}