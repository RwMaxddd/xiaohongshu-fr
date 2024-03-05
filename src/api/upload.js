import request from '../axios/index'

//发布文章
export const publishArticle = (formData) => {
    return request.post('/article',formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}