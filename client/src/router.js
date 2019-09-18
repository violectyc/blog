import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('./views/Home.vue'),
        },
        {
            path: '/article',
            name: 'Article',
            component: () => import('./views/Article.vue'),
            children: [
                {
                    path: 'editor',
                    name: 'Editor',
                    component: () => import('./components/editor')
                },
                {
                    path: 'article-detail',
                    name: 'ArticleDetail',
                    component: () => import('./components/article-detail')
                }
            ]
        }, {
            path: '/gallery',
            name: 'Gallery',
            component: () => import('./views/Gallery.vue'),
            children: [
                {
                    path: 'put',
                    name: 'PutGallery',
                    component: () => import('./components/put-gallery')
                },
                {
                    path:'detail',
                    name:'GalleryDetail',
                    component:()=>import('./components/gallery-detail')
                }
            ]
        }, {
            path: '/message',
            name: 'Message',
            component: () => import('./views/Message.vue')
        },
        {
            path: '/about',
            name: 'About',
            component: () => import('./views/About.vue'),
            children: [
                {
                    path: 'login',
                    name: 'Login',
                    component: () => import('./components/login')
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: () => import('./components/register')
                }, {
                    path: 'userInfo',
                    name: 'UserInfo',
                    component: () => import('./components/user-info')
                }
            ]
        }

    ]
});
export default router;
