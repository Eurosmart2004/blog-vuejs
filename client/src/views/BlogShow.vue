<template>
  <div class="container">
    <Modal :isLoading="isLoading" />
    <BlogPreview
      v-if="title && image && content"
      :blog="{
        title: title,
        imagePreview: image,
        content: content,
      }"
      @close="handleBack"
    />
    <hr />
    <Emoji
      v-if="!isLoading"
      :userData="this.$store.state.userData"
      :mostCommonReacts="mostCommonReacts"
      :icon="iconChoose"
      :numberReact="numberReact"
      @emoji-click="handleEmojiClick"
    />
    <Comment :blogId="this.$route.params.id" />
  </div>
</template>
<script>
import instance from "@/axios/instance";
import Modal from "@/components/Modal.vue";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.core.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import BlogPreview from "@/components/BlogPreview.vue";
import Emoji from "@/components/Emoji.vue";
import Comment from "@/components/Comment/Comment.vue";

export default {
  name: "BlogShow",
  components: { Modal, BlogPreview, Emoji, Comment },

  data() {
    return {
      title: "",
      image: "",
      content: "",
      isLoading: true,
      numberReact: 0,
      iconChoose: "",
      mostCommonReacts: {},
    };
  },
  computed: {
    blog() {
      return {
        title: this.title,
        imagePreview: this.image,
        content: this.content,
      };
    },
  },
  created() {
    this.isFetch = false;
    this.interval = setInterval(this.fetchEmoji, 1000);
  },
  unmounted() {
    clearInterval(this.interval);
  },
  async mounted() {
    try {
      if (this.$store.state.blogUsers) {
        this.$store.state.blogUsers.forEach((blog) => {
          if (blog._id === this.$route.params.id) {
            this.title = blog.blogTitle;
            this.image = blog.blogImage;
            this.content = blog.blogHTML;
          }
        });
      }

      if (
        this.$store.state.allBlog &&
        (this.title === "" || this.image === "" || this.content === "")
      ) {
        this.$store.state.allBlog.forEach((blog) => {
          if (blog._id === this.$route.params.id) {
            this.title = blog.blogTitle;
            this.image = blog.blogImage;
            this.content = blog.blogHTML;
          }
        });
      }
      if (this.title === "" || this.image === "" || this.content === "") {
        let response = await instance.get(
          `/blog/getBlog/${this.$route.params.id}`
        );
        this.title = response.data.blog.blogTitle;
        this.image = response.data.blog.blogImage;
        this.content = response.data.blog.blogHTML;
      }
      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    async handleEmojiClick(emoji) {
      try {
        let response = await instance.post("react/addReact", {
          blogId: this.$route.params.id,
          reactType: emoji,
        });
        response = await instance.get(
          `react/getAll?blogId=${this.$route.params.id}`
        );
        this.numberReact = response.data.numberReact;
        this.mostCommonReacts = response.data.mostCommonReacts;
      } catch (error) {
        console.log(error);
      }
    },

    async fetchEmoji() {
      if (this.isFetch) return;
      this.isFetch = true;
      let response = await instance.get(
        `react/getAll?blogId=${this.$route.params.id}`
      );
      this.numberReact = response.data.numberReact;
      this.mostCommonReacts = response.data.mostCommonReacts;
      if (this.$store.state.userData) {
        response = await instance.get(
          `/react/getReact?blogId=${this.$route.params.id}`
        );
        if (response.data.message === "No react found") {
          this.iconChoose = "";
        } else {
          this.iconChoose = response.data.react.reactType;
        }
      }
      this.isFetch = false;
    },
  },
};
</script>
<style scoped></style>
