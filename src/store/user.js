import { defineStore } from 'pinia'
import {verifyToken} from '../api/verifyToken'
import {getAvatar} from '../api/user'


export const useUserStore = defineStore('user', {
    state: () => {
        return {
            // 所有这些属性都将自动推断出它们的类型
            userId: '',
            userName: '',
            avatarSrc: '',
            isVerify:false,
            isShowModifyForm:false,
            isAdmin:0
        }
    },
    getters: {
        isLogin: (state) => state.userId !== '',
    },
    actions: {
        async getUserId() {
            try {
                if (localStorage.getItem('token')) {
                    const resData = await verifyToken()
                    this.userId = resData.user_id
                    this.isAdmin = resData.admin
                    this.isVerify = true
                }else {
                    this.isVerify = true
                }
            }catch (e) {
                if (e.response.status === 401) {
                    localStorage.removeItem('token')
                }
                this.isVerify = true
                console.log(e)
            }
        },
        async getAvatarSrc() {
            try {
                if (this.userId !== '') {
                    const resData = await getAvatar(this.userId)
                    this.avatarSrc = resData.data
                }
            }catch (e) {
                console.log(e)
            }
        },
        logOut() {
            this.$patch({
                userId: '',
                userName: '',
                avatarSrc: '',
                isVerify:true,
                isShowModifyForm:false,
                isAdmin:0
            })
            localStorage.removeItem('token')
        }
    },
})