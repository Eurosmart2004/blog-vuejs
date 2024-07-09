<template>
  <div class="container-fluid bg-body-secondary px-5">
    <Modal :isLoading="isLoading" />
    <!-- User -->
    <div v-if="this.$store.state.userData" class="px-md-5">
      <div class="flex-row d-inline-flex pt-5 pb-3">
        <span class="fs-6">Toggle Editing Blog</span>
        <input
          class="ms-4"
          type="checkbox"
          v-model="editPost"
          style="cursor: pointer"
        />
      </div>

      <div class="row">
        <p class="fs-3 text-uppercase col-md-8">Your blogs</p>
        <div class="col-md-4">
          <div class="input-group">
            <input type="text" class="form-control" v-model="searchUserBlog" />
            <span class="input-group-text" id="">Search</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="col-12 col-sm-6 col-md-4 col-lg-3 p-3 m-0"
          v-for="(blog, index) in blogUsers"
        >
          <BlogCard :blog="blog" :index="index" class="responsive-card">
            <template v-if="editPost" v-slot:button-group>
              <div class="button-container">
                <router-link
                  :to="{
                    name: 'BlogEdit',
                    params: { id: blog._id },
                  }"
                  class="edit-icon"
                >
                  <i class="bi bi-pencil-square" style="font-size: 1.5em"></i>
                </router-link>
              </div>
            </template>
          </BlogCard>
        </div>
      </div>
      <div
        v-if="!isLoading && totalItemBlogUsers > 0"
        class="d-flex align-items-center justify-content-center py-2"
      >
        <Pagination
          :totalItems="totalItemBlogUsers"
          :itemPerPage="itemPerPage"
          :page="currentPageBlogUsers"
          @pageChange="handlePageBlogUserChange"
        />
      </div>
    </div>
    <hr class="my-5" />
    <!-- Social blog -->
    <div class="px-md-5">
      <div class="row">
        <p class="fs-3 text-uppercase col-md-8">Other blogs</p>
        <div class="col-md-4">
          <div class="input-group">
            <input type="text" class="form-control" v-model="searchAllBlog" />
            <span class="input-group-text" id="">Search</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          v-if="!isLoading"
          class="col-12 col-sm-6 col-md-4 col-lg-3 p-3 m-0"
          v-for="(blog, index) in allBlog"
        >
          <BlogCard :blog="blog" :index="index" class="responsive-card" />
        </div>
      </div>
      <div
        v-if="!isLoading && totalItemAllBlog > 0"
        class="d-flex align-items-center justify-content-center py-2"
      >
        <Pagination
          :totalItems="totalItemAllBlog"
          :itemPerPage="itemPerPage"
          :page="currentPageBlogAll"
          @pageChange="handlePageBlogAllChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import BlogCard from "../components/BlogCard.vue";
import Modal from "../components/Modal.vue";
import Pagination from "../components/Pagination.vue";
export default {
  name: "Blog",
  components: { BlogCard, Modal, Pagination },
  data() {
    return {
      isLoading: true,
      currentPageBlogUsers: 1,
      currentPageBlogAll: 1,
      itemPerPage: 4,
      editPost: false,
      searchUserBlog: "",
      searchAllBlog: "",
    };
  },
  async mounted() {
    if (
      this.$store.state.blogUsers === null ||
      this.$store.state.blogUsers === undefined
    ) {
      await this.$store.dispatch("getBlogByUserId");
    }
    if (
      this.$store.state.allBlog === null ||
      this.$store.state.allBlog === undefined
    ) {
      await this.$store.dispatch("getAllBlogs");
    }
    this.isLoading = false;
  },
  watch: {
    searchUserBlog: function () {
      this.currentPageBlogUsers = 1;
    },
    searchAllBlog: function () {
      this.currentPageBlogAll = 1;
    },
  },
  computed: {
    blogUsers() {
      if (
        this.$store.state.blogUsers === undefined ||
        this.$store.state.blogUsers === null
      )
        return [];

      return this.$store.state.blogUsers
        .filter((blog) =>
          blog.blogTitle
            .toString()
            .toLowerCase()
            .includes(this.searchUserBlog.toLowerCase())
        )
        .slice(
          (this.currentPageBlogUsers - 1) * this.itemPerPage,
          this.currentPageBlogUsers * this.itemPerPage
        );
    },
    allBlog() {
      if (
        this.$store.state.allBlog === undefined ||
        this.$store.state.allBlog === null
      )
        return [];

      return this.$store.state.allBlog
        .filter((blog) =>
          blog.blogTitle
            .toString()
            .toLowerCase()
            .includes(this.searchAllBlog.toLowerCase())
        )
        .slice(
          (this.currentPageBlogAll - 1) * this.itemPerPage,
          this.currentPageBlogAll * this.itemPerPage
        );
    },
    totalItemBlogUsers() {
      if (this.$store.state.blogUsers === undefined) return 0;
      return this.$store.state.blogUsers.filter((blog) =>
        blog.blogTitle
          .toString()
          .toLowerCase()
          .includes(this.searchUserBlog.toLowerCase())
      ).length;
    },
    totalItemAllBlog() {
      if (this.$store.state.allBlog === undefined) return 0;
      return this.$store.state.allBlog.filter((blog) =>
        blog.blogTitle
          .toString()
          .toLowerCase()
          .includes(this.searchAllBlog.toLowerCase())
      ).length;
    },
  },
  methods: {
    handlePageBlogUserChange(page) {
      this.currentPageBlogUsers = page;
    },
    handlePageBlogAllChange(page) {
      this.currentPageBlogAll = page;
    },
  },
};
</script>
<style scoped>
.button-container {
  position: absolute;
  top: 0;
  right: 0px;
}

.delete-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  color: #000000;
  border-radius: 50%;
  border: none;
  top: 10px;
  right: 55px;
  transition: all ease-in 0.2s;
  background-color: white;
}
.delete-icon:hover {
  background-color: #303030;
  color: white;
}
.delete-icon::before {
  content: "";
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.edit-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  color: #000000;
  border-radius: 50%;
  border: none;
  top: 10px;
  right: 10px;
  transition: all ease-in 0.2s;
  background-color: white;
}
.edit-icon::before {
  content: "";
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.edit-icon:hover {
  background-color: #303030;
  color: white;
}

input[type="checkbox"] {
  position: relative;
  border: none;
  -webkit-appearance: none;
  background: #fff;
  outline: none;
  width: 60px;
  height: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

input[type="checkbox"]:before {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  top: 0;
  left: 0;
  background: #fff;
  transform: scale(1.1);
  transition: 750ms ease all;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

input:checked[type="checkbox"]:before {
  background: #303030;
  left: 52px;
}

@media screen and (min-width: 1200px) {
  .responsive-card {
    /* width: 16rem; */
  }
}
</style>
