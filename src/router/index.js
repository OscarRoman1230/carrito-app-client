import { createRouter, createWebHistory } from 'vue-router'
import Auth from "../views/Auth";
import Products from "../views/Products";
import UserSales from "../views/UserSales";

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/user-sales',
    name: 'UserSales',
    component: UserSales
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
