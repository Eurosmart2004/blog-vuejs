<template>
  <div class="card blog-card h-100">
    <router-link
      class="text-black text-decoration-none position-relative d-flex flex-column"
      :to="{ name: 'BlogShow', params: { id: blog._id } }"
    >
      <slot name="button-group"></slot>

      <img
        :src="`${blog.blogImage}`"
        class="card-img-top"
        alt="..."
        style="
          min-height: 200px;
          max-height: 200px;
          object-fit: cover;
          object-position: center;
        "
      />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-truncate">{{ blog.blogTitle }}</h5>
        <p class="card-text">
          {{ blogDate }}
        </p>
        <div class="mt-auto">
          <div
            :to="{ name: 'BlogShow', params: { id: blog._id } }"
            class="text-black text-uppercase my-sm-3 text-decoration-none animated-link"
          >
            <span style="display: inline-flex; align-items: center">
              View the blog
              <i
                class="bi bi-arrow-right"
                style="font-size: 1em; margin-left: 0.5em"
              ></i>
            </span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "BlogCard",
  props: ["blog"],
  components: {},
  data() {
    return {};
  },
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
};
</script>
<style scoped>
.blog-card {
  transition: all ease-in 0.3s;
}
.blog-card:hover {
  rotate: -2deg;
}

@media screen and (max-width: 768px) {
  .blog-card:hover {
    rotate: 0deg;
  }
}
</style>
