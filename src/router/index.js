import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/prattle',
        name: 'Prattle',
        component: () => import(/* webpackChunkName: "about" */ '../views/Prattle.vue')
    },
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
        meta: { title: '首页' },
        children: [
            {
                path: '/dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/page/Dashboard.vue'),
                meta: { title: '首页' }
            },
            {
                path: '/table',
                component: () => import(/* webpackChunkName: "table" */ '../views/page/BaseTable.vue'),
                meta: { title: '文件列表' }
            },
            {
                path: '/404',
                component: () => import(/* webpackChunkName: "404" */ '../views/page/404.vue'),
                meta: { title: '404' }
            }
        ]
    },
    {
        path: '*',
        redirect: '/404'
    }
];

const router = new VueRouter({
    routes
});

export default router;
