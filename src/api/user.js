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
export const getUserInfo = (userId,currentUserId) => {
    return request.get('/getUserInfo',{
        params: {
            user_id: userId,
            currentUserId
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
//关注用户
export const followUser = (data) => {
    return request.post('/addFans',data)
}
//取消关注用户
export const cancelFollowApi = (data) => {
    return request.post('/deleteFans',data)
}
//查询用户是否已经关注
export const checkIsFans = (userId,currentUserId) => {
    return request.get('/isFans',{
        params: {
            user_id: userId,
            currentUserId
        }
    })
}