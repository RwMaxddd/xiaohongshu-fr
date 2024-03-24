import request from '../axios/index'

//获取用户头像照片
export const getAvatar = (userId) => {
    return request.get('/avatar',{
        params: {
            user_id: userId
        }
    })
}
//获取用户信息
export const getUserInfo = (userId) => {
    return request.get('/getUserInfo',{
        params: {
            user_id: userId
        }
    })
}
//更新用户信息
export const updateUserInfo = (formData) => {
    return request.post('/updateUserInfo',formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}