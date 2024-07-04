import router from "@/router/route";
import { createStore } from "vuex";
import instance from "@/axios/instance";
const store = createStore({
  state: {
    userData: null,
    routerReady: false,
    blog: {
      title: null,
      content: null,
      image: null,
      imagePreview: null,
    },
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    setUserData(state, payload) {
      state.userData = payload;
    },
    logOut(state) {
      state.userData = null;
      state.blog = {
        title: null,
        content: null,
        image: null,
        imagePreview: null,
      };
      state.blogUsers = null;
    },
    setRouterReady(state, ready) {
      state.routerReady = ready;
    },
    setBlogTitle(state, title) {
      state.blog.title = title;
    },
    setBlogContent(state, content) {
      state.blog.content = content;
    },
    setBlogImage(state, image) {
      state.blog.image = image;
    },
    setBlogImagePreview(state, imagePreview) {
      state.blog.imagePreview = imagePreview;
    },
    setBlogUsers(state, blog) {
      state.blogUsers = blog.slice().reverse();
    },
    setAllBlogs(state, blog) {
      state.allBlog = blog.slice().reverse();
    },
  },
  actions: {
    async getBlogByUserId({ commit }) {
      try {
        const response = await instance.get(
          `/blog/getByUser/${this.state.userData._id}`
        );
        commit("setBlogUsers", response.data.blog);
      } catch (error) {}
    },
    async getAllBlogs({ commit }) {
      try {
        const response = await instance.get("/blog/getAll");
        commit("setAllBlogs", response.data.blog);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});

export default store;
