<template>
  <div class="col-12 row p-2 m-0 blog-post">
    <div
      class="h-100 col-md-5 d-flex flex-column justify-content-center px-lg-3 p-4 order-2"
      :class="[
        blog.welComeScreen ? 'bg-dark bg-gradient' : 'bg-white',
        index % 2 === 0 ? 'order-md-1' : 'order-md-2',
      ]"
    >
      <h2
        class="text-uppercase px-4 my-sm-2"
        :class="blog.welComeScreen ? 'text-white' : 'text-black'"
      >
        {{ blog.blogTitle }}
      </h2>
      <p
        class="px-4 my-sm-2"
        :class="blog.welComeScreen ? 'text-white' : 'text-black'"
      >
        {{ blogDate }}
      </p>
      <div v-if="blog.welComeScreen" class="mt-5 px-4">
        <router-link
          :to="{ name: 'Login' }"
          class="text-white text-uppercase my-sm-2 text-decoration-none animated-link"
        >
          <span style="display: inline-flex; align-items: center">
            Login
            <i
              class="bi bi-arrow-right"
              style="font-size: 1em; margin-left: 0.5em"
            ></i>
          </span>
        </router-link>
      </div>
      <div v-else class="mt-5 px-4">
        <router-link
          :to="`/blog/${blog._id}`"
          class="text-black text-uppercase my-sm-2 text-decoration-none animated-link"
        >
          <span style="display: inline-flex; align-items: center">
            View the blog
            <i
              class="bi bi-arrow-right"
              style="font-size: 1em; margin-left: 0.5em"
            ></i>
          </span>
        </router-link>
      </div>
    </div>
    <div
      class="h-100 col-md-7 p-0 border-1 border-black order-1"
      :class="[index % 2 === 0 ? 'order-md-2' : 'order-md-1']"
    >
      <img
        :src="`${blog.blogImage}`"
        alt=""
        class="img-fluid object-fit-cover h-100 w-100"
      />
    </div>
  </div>
  <hr />
</template>
<script>
export default {
  name: "BlogPost",
  props: ["blog", "index"],
  computed: {
    blogDate() {
      const date = new Date(this.blog.datePost);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(date);
    },
  },
  components: {},
};
</script>
<style lang="scss" scoped>
.blog-post {
  height: 450px;
  @media screen and (max-width: 792px) {
    height: fit-content;
  }
}
</style>
