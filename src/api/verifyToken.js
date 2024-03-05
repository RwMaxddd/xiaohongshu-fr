import request from '../axios/index'

//校验token
export const verifyToken = () => {
    return request.get('/protected')
}