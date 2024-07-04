<template>
  <div>
    <ModalDeleteComment
      v-if="showDelete"
      :comment="comment"
      @close="showDelete = false"
      @delete="handleDeleteComment"
    />
  </div>
  <div v-if="user && comment" class="comment_container my-3">
    <div class="comment_card p-3 bg-white border border-1 rounded-3">
      <div v-if="user" class="d-flex align-item-center gap-2">
        <div class="" v-if="user.userImage">
          <img
            :src="user.userImage"
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
            {{ user.firstName[0] }} {{ user.lastName[0] }}
          </p>
        </div>
        <p class="d-flex align-items-center m-0">
          {{ user.firstName }} {{ user.lastName }}
        </p>
        <p class="d-flex align-items-center m-0" v-if="comment.updatedAt">
          Updated at {{ date }}
        </p>
        <p class="d-flex align-items-center m-0" v-else>
          {{ date }}
        </p>
      </div>
      <p class="my-3">
        {{ comment.content }}
      </p>
      <div v-if="this.$store.state.userData" class="comment_footer">
        <button
          class="btn btn-outline-secondary"
          @click.prevent="
            showReply = !showReply;
            if (showReply) showEdit = false;
          "
        >
          Reply
        </button>
        <button
          v-if="this.$store.state.userData._id === comment.userId"
          class="ms-2 btn btn-outline-secondary"
          @click.prevent="
            showEdit = !showEdit;
            if (showEdit) showReply = false;
          "
        >
          Edit
        </button>
        <button
          v-if="this.$store.state.userData._id === comment.userId"
          class="ms-2 btn btn-danger"
          @click.prevent="showDelete = !showDelete"
        >
          Delete
        </button>
        <!-- For reply -->
        <div v-if="showReply" class="mt-3">
          <div class="form-floating">
            <textarea
              type="text"
              class="form-control"
              id="commentReply"
              placeholder="Reply to this comment"
              v-model="commentReply"
              style="height: 80px; resize: none"
            >
            </textarea>
            <label for="commentReply">Reply to this comment</label>
            <button
              @click.prevent="handleAddComment"
              class="mt-2 btn btn-outline-secondary"
            >
              Reply
            </button>
          </div>
        </div>

        <!-- For edit -->
        <div v-if="showEdit" class="mt-3">
          <div class="form-floating">
            <textarea
              type="text"
              class="form-control"
              id="commentEdit"
              placeholder="Edit this comment"
              v-model="commentEdit"
              style="height: 80px; resize: none"
            >
            </textarea>
            <label for="commentEdit">Edit this comment</label>
            <button
              @click.prevent="handleEditComment"
              class="mt-2 btn btn-outline-secondary"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Show/hide comment -->
    <div v-if="comment">
      <p
        v-if="!showChildComment && comment.replyId.length > 0"
        @click.prevent="showChildComment = true"
        class="text-decoration-none text-black my-2"
        style="cursor: pointer"
      >
        Show reply
      </p>
      <p
        v-if="showChildComment && comment.replyId.length > 0"
        @click.prevent="showChildComment = false"
        class="text-decoration-none text-black my-2"
        style="cursor: pointer"
      >
        Hide
      </p>
    </div>
    <!-- /Show/hide comment -->
    <CommentTemplate
      v-if="showChildComment && comment.replyId.length > 0"
      v-for="reply in comment.replyId"
      :key="reply"
      :commentId="reply"
      @delete="deleteComment"
    />
  </div>
</template>
<script>
import instance from "@/axios/instance";
import ModalDeleteComment from "./ModalDeleteComment.vue";
export default {
  name: "CommentTemplate",
  props: {
    commentId: {
      type: String,
      required: true,
    },
  },
  components: { ModalDeleteComment },
  data() {
    return {
      showReply: false,
      showEdit: false,
      showDelete: false,
      commentReply: "",
      showChildComment: false,
      user: null,
      replies: [],
      comment: null,
    };
  },
  emits: ["delete"],
  created() {
    this.interval = setInterval(this.fetchComment, 1000);
  },
  unmounted() {
    clearInterval(this.interval);
  },
  computed: {
    date() {
      if (this.comment.updatedAt || this.comment.createdAt) {
        let commentDate = new Date(
          this.comment.updatedAt || this.comment.createdAt
        );
        let now = new Date();

        let diffInSeconds = Math.abs((now - commentDate) / 1000).toFixed(0);
        let diffInMinutes = Math.floor(diffInSeconds / 60).toFixed(0);
        let diffInHours = Math.floor(diffInSeconds / 3600).toFixed(0);
        let diffInDays = Math.floor(diffInSeconds / 86400).toFixed(0);
        let diffInYears = Math.floor(diffInSeconds / (86400 * 365)).toFixed(0);

        if (diffInYears > 0) {
          return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
        } else if (diffInDays > 0) {
          return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
        } else if (diffInHours > 0) {
          return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
        } else if (diffInMinutes > 0) {
          return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
        } else {
          return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
        }
      }

      return "";
    },
  },
  watch: {
    async commentId(newCommentId) {
      this.commentId = newCommentId;
      try {
        const responseComment = await instance.get(
          `/comment/getComment/${this.commentId}`
        );
        this.comment = responseComment.data.comment;
        this.commentEdit = this.comment.content;
        const responseUser = await instance.get(
          `user/basicInfo/${this.comment.userId}`
        );
        this.user = responseUser.data.user;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    try {
      const responseComment = await instance.get(
        `/comment/getComment/${this.commentId}`
      );
      this.comment = responseComment.data.comment;
      this.commentEdit = this.comment.content;
      const responseUser = await instance.get(
        `user/basicInfo/${this.comment.userId}`
      );
      this.user = responseUser.data.user;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async fetchComment() {
      try {
        const responseComment = await instance.get(
          `/comment/getComment/${this.commentId}`
        );
        this.comment = responseComment.data.comment;
        // this.commentEdit = this.comment.content;
        const responseUser = await instance.get(
          `user/basicInfo/${this.comment.userId}`
        );
        this.user = responseUser.data.user;
      } catch (error) {
        console.log(error);
        if (error.response.data.message === "Comment not found") {
          this.$emit("delete");
        }
      }
    },

    async handleAddComment() {
      if (this.commentReply === "") {
        this.showReply = false;
        return;
      }
      try {
        const response = await instance.post("/comment/addReplyComment", {
          content: this.commentReply,
          userId: this.$store.state.userData._id,
          blogId: this.comment.blogId,
          commentId: this.comment._id,
        });
        const responseComment = await instance.get(
          `/comment/getComment/${this.commentId}`
        );
        this.comment = responseComment.data.comment;
        this.commentReply = "";
        this.showChildComment = true;
        this.showReply = false;
      } catch (error) {
        console.error(error);
      }
    },

    async handleEditComment() {
      try {
        if (this.commentEdit === this.comment.content) {
          this.showEdit = false;
          return;
        }
        const response = await instance.put(
          `/comment/editComment/${this.comment._id}`,
          {
            content: this.commentEdit,
            userId: this.$store.state.userData._id,
          }
        );
        const responseComment = await instance.get(
          `/comment/getComment/${this.commentId}`
        );
        this.comment = responseComment.data.comment;
        this.commentEdit = this.comment.content;
        this.showEdit = false;
      } catch (error) {
        console.error(error);
      }
    },

    async handleDeleteComment() {
      this.showDelete = false;
      try {
        const response = await instance.delete(
          `/comment/deleteComment/${this.comment._id}`
        );
        this.$emit("delete");
      } catch (error) {
        console.error(error);
      }
    },
    async deleteComment() {
      const responseComment = await instance.get(
        `/comment/getComment/${this.commentId}`
      );
      this.comment = responseComment.data.comment;
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
