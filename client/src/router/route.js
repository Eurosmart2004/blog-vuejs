import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Blog from "../views/Blog.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Profile from "../views/Profile.vue";
import CreateBlog from "../views/CreateBlog.vue";
import store from "@/store/store";
import { refreshToken } from "@/axios/instance";
import BlogPreview from "@/components/BlogPreview.vue";
import BlogShow from "@/views/BlogShow.vue";
import BlogEdit from "@/views/BlogEdit.vue";
import ResetPassword from "@/views/ResetPassword.vue";
const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/blog",
      name: "Blog",
      component: Blog,
      meta: {
        title: "Blog",
      },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        title: "Login",
      },
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: {
        title: "Register",
      },
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: ForgotPassword,
      meta: {
        title: "Forgot Password",
      },
    },
    {
      path: "/reset-password/:token",
      name: "ResetPassword",
      component: ResetPassword,
      meta: {
        title: "Reset Password",
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: {
        title: "Profile",
        needsAuth: true,
      },
    },
    {
      path: "/create-blog",
      name: "CreateBlog",
      component: CreateBlog,
      meta: {
        title: "Create Blog",
        needsAuth: true,
      },
    },
    {
      path: "/blog-preview",
      name: "BlogPreview",
      component: BlogPreview,
      meta: {
        title: "Blog Preview",
        needsAuth: true,
      },
    },
    {
      path: "/blog/:id",
      name: "BlogShow",
      component: BlogShow,
      meta: {
        title: "Blog Show",
        // needsAuth: true,
      },
    },
    {
      path: "/edit-blog/:id",
      name: "BlogEdit",
      component: BlogEdit,
      meta: {
        title: "Edit Blog",
        needsAuth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title} | Vue Blog`;
  let userData = null;
  if (!store.state.routerReady) {
    try {
      userData = await refreshToken(true);
    } catch (error) {}
    if (userData) {
      store.commit("setUserData", userData);
      localStorage.setItem("isLoggedIn", true);
    }
    store.commit("setRouterReady", true);
  }
  if (store.state.userData) {
    if (to.name === "Login" || to.name === "Register") {
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    if (to.meta.needsAuth) {
      next({ name: "Login" });
    } else {
      next();
    }
  }
});

export default router;
