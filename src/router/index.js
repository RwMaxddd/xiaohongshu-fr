import { createRouter,createWebHashHistory } from 'vue-router'
import { useUserStore } from '../store/user'
import { useArticleStore } from '../store/article'
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
                        meta: {secondItemName: 'discuss',init: true},
                    },
                    {
                        path: 'ThePopularization',
                        name:'popularization',
                        component: () => import('../components/ThePopularization'),
                        meta: {secondItemName: 'popularization',init: true},
                    },
                    {
                        path: 'TheActivity',
                        name:'activity',
                        component: () => import('../components/TheActivity'),
                        meta: {secondItemName: 'activity',init: true},
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
                meta: { itemName: 'user',init: true},
            },
            {
                path: 'TheInform',
                name:'inform',
                component: () => import('../components/TheInform'),
                meta: { itemName: 'inform'},
                children: [
                    {
                        path: 'Agree',
                        name:'agree',
                        component: () => import('../components/AgreeMessage'),
                        meta: {secondItemName: 'agree'},
                    },
                    {
                        path: 'Comment',
                        name:'comment',
                        component: () => import('../components/CommentMessage'),
                        meta: {secondItemName: 'comment'},
                    },
                ],
                redirect: { name: 'agree' }
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
                meta: { itemName: 'article',init: true},
            },
            {
                path: 'Search',
                name:'search',
                component: () => import('../components/TheSearch'),
                meta: { itemName: 'explore',init: true},
            },
        ],
        redirect: { name: 'explore' }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

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
    if (from.meta.init && to.fullPath != from.fullPath){
        const articleStore = useArticleStore()
        articleStore.init()
    }
})

export default router