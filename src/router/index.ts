import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Login from "../views/Auth/Login/Login.vue";
import Register from "../views/Auth/Register/Register.vue";
import Home from "../views/Home/Home.vue";
import ProductCrud from "../views/ProductCrud/ProductCrud.vue";
import authService from "../services/Auth/auth.service";
import ProductList from "../views/ProductList/ProductList.vue";
import { useAuthStore } from "../store/auth";
const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Home", component: Home, meta: { requiresAuth: true } },
  {
    path: "/list-products",
    name: "ProductList",
    component: ProductList,
    meta: { requiresAuth: true },
  },
  {
    path: "/products",
    name: "Product",
    component: ProductCrud,
    meta: { requiresAuth: true, role: "admin" },
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth) {
    const isAuthenticated = await authService.checkToken();
    console.log("antes", to);
    if (!isAuthenticated) {
      next("/login");
    } else if (to.meta.role && !authStore.hasRole(to.meta.role)) {
      return next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
