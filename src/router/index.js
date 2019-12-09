import Vue from 'vue'
import VueRouter from 'vue-router'
import About from "@/components/about.vue"
import HelloWorld from "@/components/HelloWorld.vue"
import index from "@/index.vue"
import ChooseEntrance from "@/pages/chooseEntrance"
import Test from "@/pages/chooseEntrance/test"
import SonTest from "@/pages/SonTest"

Vue.use(VueRouter)

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  {
    path: '/index',
    component: index,
    children: [
      {
        path: '/index/HelloWorld',
        name: 'HelloWorld',
        component: HelloWorld,
        props: (route) => ({ query: route.query.type })
      },
      {
        path: '/index/about',
        name: 'About',
        component: About,
        props: (route) => ({ query: route.query.type })
      },
      {
        path: '/chooseEntrance',
        name: 'chooseEntrance',
        component: ChooseEntrance,
        props: (route) => ({ query: route.query.type })
      },
      {
        path: '/test',
        name: 'test',
        component: Test,
        props: (route) => ({ query: route.query.type })
      },
      {
        path: '/sontest',
        name: 'sontest',
        component: SonTest,
        props: (route) => ({ query: route.query.type })
      },
    ],
    meta: {
      title: 'dashboard',
      icon: 'dashboard',
      noCache: true,
      affix: true
    }
  },

  // 重定向
  {
    path: '/',
    redirect: '/index'
  }
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes   // (缩写) 相当于 routes: routes
})

export default router;
