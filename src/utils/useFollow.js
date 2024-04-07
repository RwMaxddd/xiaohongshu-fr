import {ref, watchEffect} from 'vue'
import { followUser, cancelFollowApi} from "../api/user"


export function useFollow(value) {
    const data = ref(false)

    async function handleFollow(updateData) {
        try {
            await followUser(updateData)
            data.value = true
        }catch (e) {
            console.log(e)
        }
    }
    async function cancelFollow(updateData) {
        try {
            await cancelFollowApi(updateData)
            data.value = false
        }catch (e) {
            console.log(e)
        }
    }
    watchEffect(() => {
        data.value = value.value
    })

    return { data, handleFollow, cancelFollow }
}