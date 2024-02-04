import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'products',
        name: '產品列表',
        component: () => import('../views/UserProducts.vue')
      },
      {
        path: 'cart',
        name: '購物車',
        component: () => import('../views/UserCart.vue')
      },
      {
        path: 'products/:id',
        name: '產品細節',
        component: () => import('../views/UserProductDetail.vue')
      }
    ]
  },
  {
    path: '/login',
    name: '登入驗證',
    component: () => import('../views/UserLogin.vue')
  },
  {
    path: '/admin',
    name: '後台頁面',
    component: () => import('../views/AdminDashBoard.vue'),
    children: [
      {
        path: 'products',
        name: '後臺產品',
        component: () => import('../views/AdminProducts.vue')
      },
      {
        path: 'orders',
        name: '客戶訂單',
        component: () => import('../views/AdminOrder.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
