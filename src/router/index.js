import { createRouter, createWebHistory } from 'vue-router'
import Auth from "../views/Auth";
import Products from "../views/Products";
import UserSales from "../views/UserSales";

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
    meta: {
      guest: true
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/user-sales',
    name: 'UserSales',
    component: UserSales,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user-coupon',
    name: 'Coupon',
    component: UserSales,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function loggedIn () {
  return !!localStorage.getItem('token');
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn()) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!loggedIn()) {
      next()
    } else {
      next({ name: 'Products' })
    }
  } else {
    next()
  }
})

export default router
