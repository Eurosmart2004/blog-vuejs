<template>
  <div class="mt-5">
    <div
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :visible-once="{ opacity: 1, y: 0, scale: 1 }"
      :delay="200"
      :duration="600"
      class="min-vh-100 mask"
      style="
        padding: 0;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        background-size: cover;
        background-position: 50%;
      "
      :style="[
        this.$store.state.userData
          ? `background-image: linear-gradient(
            rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0.8)
          ),
          url(https://images.unsplash.com/photo-1542826438-bd32f43d626f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2192&q=80);`
          : `background-image: linear-gradient(
            rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0.8)
          ),
          url(https://assets.entrepreneur.com/content/3x2/2000/20150824161251-wordpress-blogging-writing-typing-macbook-laptop-computer-technology-business-working.jpeg);`,
      ]"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-sm-9 text-start">
            <h1
              class="display-2 font-weight-bolder text-white mb-4"
              spellcheck="false"
            >
              {{
                this.$store.state.userData
                  ? "A Blog for Creating, Sharing and Inspiring"
                  : "Welcome to our Blog platform "
              }}
            </h1>
            <p class="lead text-white mb-5">
              A blog is a discussion or informational website published on the
              World Wide Web consisting of discrete, often informal diary-style
              text entries.
            </p>
            <p class="lead text-white mb-5">
              {{
                this.$store.state.userData
                  ? "Create your own blog and share your thoughts with the world."
                  : "Create an account and start sharing your thoughts with the world."
              }}
            </p>
            <router-link
              v-if="this.$store.state.userData"
              :to="{ name: 'CreateBlog' }"
              class="btn btn-light px-4 py-2"
              >Create Blog</router-link
            >
            <router-link
              v-else
              :to="{ name: 'Register' }"
              class="btn btn-light px-4 py-2"
              >Create account</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="lastest-blogs">
      <h2
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :visible-once="{ opacity: 1, y: 0, scale: 1 }"
        :delay="200"
        :duration="1000"
        class="text-center my-5 font-weight-bolder"
      >
        Lastest Blogs
      </h2>
      <div class="container">
        <div
          v-if="this.$store.state.allBlog"
          class=""
          v-for="(blog, index) in this.$store.state.allBlog.slice(0, 3)"
        >
          <BlogPost :blog="blog" :index="index" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BlogCard from "../components/BlogCard.vue";
import BlogPost from "../components/BlogPost.vue";
export default {
  name: "Home",
  components: { BlogCard, BlogPost },
  data() {
    return {};
  },
  async mounted() {
    await this.$store.dispatch("getAllBlogs");
  },
};
</script>
<style scoped>
@media screen and (max-width: 992px) {
  .responsive-img {
    height: 50% !important;
  }
}
</style>
