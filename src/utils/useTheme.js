import {ref, watchEffect} from "vue";

const STORE_KEY = '__theme__'
const theme = ref(localStorage.getItem(STORE_KEY) || 'dark')

watchEffect(() => {
    document.documentElement.dataset.theme = theme.value
    localStorage.setItem(STORE_KEY,theme.value)
})

export function useTheme() {
    return {
        theme
    }
}