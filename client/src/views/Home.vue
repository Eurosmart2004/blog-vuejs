<template>
  <div>
    <div class="container-fluid p-0">
      <div class="row p-0 m-0">
        <div
          v-if="this.$store.state.allBlog"
          class="col-12 row p-0 m-0"
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
