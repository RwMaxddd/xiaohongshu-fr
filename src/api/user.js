import request from '../axios/index'

//获取用户头像照片
export const getAvatar = (userId) => {
    return request.get('/avatar',{
        params: {
            user_id: userId
        }
    })
}