<template>
  <div class="container p-0 p-md-2">
    <button class="btn btn-outline-secondary" @click.prevent="handleBack">
      Back
    </button>
    <div class="d-flex justify-content-center align-items-center">
      <img
        :src="image"
        alt="blog image"
        class="object-fit-contain w-100"
        style="max-height: 300px"
      />
    </div>
    <hr />
    <h1 class="mt-2">{{ title }}</h1>
    <div class="ql-bubble">
      <div class="ql-editor" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import store from "@/store/store";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.core.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
export default {
  name: "BlogPreview",
  props: {
    blog: {
      title: String,
      imagePreview: String,
      content: String,
    },
  },

  created() {
    this.title = this.blog.title;
    this.image = this.blog.imagePreview;
    this.content = this.blog.content;
  },
  methods: {
    handleBack() {
      this.$emit("close");
    },
  },
};
</script>
