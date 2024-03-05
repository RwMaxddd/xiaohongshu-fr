import request from '../axios/index'

//发布文章
export const getArticles = () => {
    return request.get('/getArticles?page=0&pageSize=30')
}