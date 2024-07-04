<template>
  <div>
    <div class="container">
      <h1 class="my-3">Comment</h1>
      <div v-if="this.$store.state.userData" class="d-flex gap-2">
        <div class="" v-if="this.$store.state.userData.imagePath">
          <img
            :src="this.$store.state.userData.imagePath"
            class="rounded-circle"
            alt="Avatar"
            style="width: 50; height: 50px"
          />
        </div>
        <div v-else class="p-0">
          <p
            class="fs-6 p-2 m-0 border rounded-circle bg-secondary text-white d-inline-flex justify-content-center align-items-center"
            style="width: 50px; height: 50px"
          >
            {{ this.$store.state.userData.firstName[0] }}
            {{ this.$store.state.userData.lastName[0] }}
          </p>
        </div>
        <div class="form-floating w-100">
          <textarea
            type="text"
            class="form-control"
            id="comment"
            placeholder=""
            v-model="comment"
            style="height: 80px; resize: none"
          >
          </textarea>
          <label for="comment">Comment</label>
          <button
            @click.prevent="handleComment"
            class="my-2 btn btn-outline-secondary"
          >
            Comment
          </button>
        </div>
      </div>
      <CommentTemplate
        v-if="comments.length > 0"
        v-for="comment in comments"
        :commentId="comment._id"
        :key="comment._id"
        @delete="deleteComment"
      />
    </div>
  </div>
</template>
<script>
import CommentTemplate from "./CommentTemplate.vue";
import instance from "@/axios/instance";
export default {
  name: "Comment",
  props: {
    blogId: {
      type: String,
      required: true,
    },
  },
  components: { CommentTemplate },
  data() {
    return {
      comment: "",
      comments: [],
    };
  },
  async mounted() {},
  created() {
    this.isFetch = false;
    this.interval = setInterval(this.fetchComment, 1000);
  },
  unmounted() {
    clearInterval(this.interval);
  },
  methods: {
    async handleComment() {
      try {
        let response = await instance.post("/comment/addRootComment", {
          content: this.comment,
          userId: this.$store.state.userData._id,
          blogId: this.blogId,
        });
        response = await instance.get(
          `/comment/getRootComments/${this.blogId}`
        );
        this.comments = response.data.comments.reverse();
        this.comment = "";
      } catch (error) {
        console.log(error);
      }
    },
    async deleteComment(commentId) {
      const response = await instance.get(
        `/comment/getRootComments/${this.blogId}`
      );
      this.comments = response.data.comments.reverse();
    },
    async fetchComment() {
      if (this.isFetch) return;
      this.isFetch = true;
      try {
        const response = await instance.get(
          `/comment/getRootComments/${this.blogId}`
        );
        this.comments = response.data.comments.reverse();
      } catch (error) {
        console.log(error);
      }
      this.isFetch = false;
    },
  },
};
</script>
<style scoped>
.comment_container {
  position: relative;
}

.comment_container::before {
  content: "";
  background-color: rgb(170, 170, 170);
  position: absolute;
  min-height: 100%;
  width: 1px;
  left: -10px;
}
.comment_container:not(:first-child) {
  margin-left: 3rem;
  margin-top: 1rem;
}
.comment_card {
  min-width: 100%;
}
</style>
