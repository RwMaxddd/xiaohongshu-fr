import { createRouter,createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        redirect: { path: '/TheGlobal' }
    },
    {
        path: '/TheLogin',
        name:'login',
        component: () => import('../pages/TheLogin'),
    },
    {
        path: '/TheGlobal',
        component: () => import('../pages/TheGlobal'),
        children: [
            {
                path: 'TheExplore',
                name:'explore',
                component: () => import('../components/TheExplore')
            },
            {
                path: 'ThePublish',
                name:'publish',
                component: () => import('../components/ThePublish'),
                meta: { requiresAuth: true },
            },
            {
                path: 'TheUser',
                name:'user',
                component: () => import('../components/TheUser'),
            },
        ],
        redirect: { name: 'explore' }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

import { useUserStore } from '../store/user'
router.beforeEach( async (to) => {
    const userStore = useUserStore()
    if (!userStore.isVerify){
        await userStore.getUserId()
    }
    if (to.meta.requiresAuth && !userStore.isLogin) {
        // 此路由需要授权，请检查是否已登录
        // 如果没有，则重定向到登录页面
        return {
            path: '/TheLogin',
        }
    }
})

export default router