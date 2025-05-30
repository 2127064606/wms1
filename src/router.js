import { createRouter,createWebHistory } from "vue-router"
import HomeView from '@/views/home.vue'
import AdminView from '@/views/user/admin.vue'
import OperatorView from "./views/user/operator.vue"
import WareManagerView from "./views/ware/wareManager.vue"
import Product from "./views/ware/product.vue"
import TypeView from "./views/ware/type.vue"
import BoundView from "./views/ware/bound.vue"
import LogView from "./views/summary/log.vue"
import IndexView from "./views/index.vue"
import LoginView from "./views/login.vue"

const routes = [
  {
    path: '/',
    name:'',
    component: HomeView,
    redirect: '/index',
    children: [
      { path: 'index',name:'index', component: IndexView },
      { path: 'admin',name:'admin' ,component: AdminView },
      { path: 'operator',name:'operator' ,component: OperatorView },
      { path: 'warehouseManager',name:'warehouseManager' ,component: WareManagerView },
      { path: 'product',name:'product' ,component: Product },
      { path: 'type',name:'type' ,component: TypeView },
      { path: 'bound',name:'bound' ,component: BoundView },
      { path: 'log',name:'log' ,component: LogView},
    ]
  },
  { path: '/login',name:'login',component: LoginView }
]


const router = createRouter({
  history:createWebHistory(),
  routes
})

export default router