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
                component: () => import('../components/TheExplore'),
                meta: { itemName: 'explore' },
                children: [
                    {
                        path: 'TheDiscuss',
                        name:'discuss',
                        component: () => import('../components/TheDiscuss'),
                        meta: {secondItemName: 'discuss'},
                    },
                    {
                        path: 'ThePopularization',
                        name:'popularization',
                        component: () => import('../components/ThePopularization'),
                        meta: {secondItemName: 'popularization'},
                    }
                ],
                redirect: { name: 'discuss' }
            },
            {
                path: 'ThePublish',
                name:'publish',
                component: () => import('../components/ThePublish'),
                meta: { requiresAuth: true, itemName: 'publish' },
            },
            {
                path: 'TheUser/:id',
                name:'user',
                component: () => import('../components/TheUser'),
                meta: { itemName: 'user' },
            },
            {
                path: 'TheAdmin',
                name:'admin',
                component: () => import('../components/TheAdmin'),
                meta: { itemName: 'admin' },
            },
            {
                path: 'Article/:articleId',
                name:'article',
                component: () => import('../components/OnlyArticle'),
                meta: { itemName: 'article' },
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
import { useArticleStore } from '../store/article'
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
    if (to.name === 'admin' && !userStore.isAdmin) {
        return {
            path: '/TheLogin',
        }
    }
})
router.afterEach((to, from) => {
    if (from.name === 'article'){
        const articleStore = useArticleStore()
        articleStore.closeArticle()
    }
})

export default router