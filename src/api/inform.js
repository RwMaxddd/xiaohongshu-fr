//获取某用户发布的文章
import request from "../axios/index";

//获取点赞消息
export const getAgreeInform = (userId) => {
    return request.get('/agreeCommentMessage',{
        params: {
            userId: userId,
        },
    })
}
//获取评论消息
export const getCommentInform = (userId) => {
    return request.get('/commentMessage',{
        params: {
            userId: userId,
        },
    })
}