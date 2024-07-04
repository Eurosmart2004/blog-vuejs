<template>
  <div>
    <Modal :isLoading="isLoading" />
    <BlogPreview
      v-if="showBlogPreview"
      :blog="{
        title: title,
        imagePreview: imagePreview,
        content: content,
      }"
      @close="showBlogPreview = false"
    />
    <form v-else class="container my-3" validation="none">
      <h1>Edit Blog</h1>
      <div class="row">
        <div class="mb-3 col-md-7">
          <div class="input-group">
            <span class="input-group-text">Title</span>
            <input
              type="text"
              class="form-control"
              id="title"
              autocomplete="off"
              v-model="title"
            />
          </div>
        </div>

        <div class="col-md-5">
          <div class="mb-3">
            <div class="d-flex">
              <label for="profileImage" class="btn btn-secondary"
                >Upload Blog Image</label
              >
              <input
                type="file"
                class=""
                id="profileImage"
                accept=".png, .jpg, .jpeg"
                @change="handleImageChange"
                style="display: none"
              />
              <div class="d-inline-block ms-2">
                <p
                  v-if="this.image"
                  class="text-truncate d-flex justify-content-center align-items-center h-100 m-0"
                >
                  {{
                    this.image.name.length > 10
                      ? this.image.name.substring(0, 10) + "..."
                      : this.image.name
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="mb-3">
            <button @click.prevent="toggleShowImage" class="btn btn-secondary">
              Show preview blog image
            </button>
          </div>
        </div>
        <div class="col-12">
          <QuillEditor
            v-model="editor"
            ref="myQuillEditor"
            @ready="onEditorReady"
            @input="handleEditorInput"
            :options="{
              placeholder: 'Write something...',
              theme: 'snow',
              modules: {
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike'],
                  ['blockquote', 'code-block'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  [{ indent: '-1' }, { indent: '+1' }],
                  [{ size: ['small', false, 'large', 'huge'] }],
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  [{ color: [] }, { background: [] }],
                  [{ font: [] }],
                  [{ align: [] }],
                ],
              },
            }"
            style="height: 300px"
          />
        </div>
        <BlogImagePreview
          v-if="showPreviewImage"
          :imageSrc="imagePreview"
          @close="toggleShowImage"
        />
      </div>

      <button
        @click.prevent="handleUpdateBlog"
        type="submit"
        class="btn btn-primary mt-3"
      >
        Edit Blog
      </button>
      <button
        @click.prevent="handleBlogPreview"
        type="submit"
        class="btn btn-outline-secondary mt-3 ms-2"
      >
        Preview blog
      </button>
      <button
        @click.prevent="this.showDeleteModal = true"
        type="submit"
        class="btn btn-danger mt-3 ms-2"
      >
        Delete blog
      </button>
    </form>
    <div
      v-if="showDeleteModal"
      @click.self.prevent="toggleDeleteModal"
      class="modal show d-block pt-5 bg-opacity-75 bg-dark"
      tabindex="-1"
    >
      <div
        v-motion:
        :initial="{ y: 50, opacity: 0 }"
        :enter="{ y: 0, opacity: 1 }"
        :duration="700"
        class="modal-dialog"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete blog</h5>
          </div>
          <div class="modal-body">
            <p>This blog will be deleted permenantly</p>
            <p class="bg-danger-subtle p-3 rounded-1 text-danger">
              Warning: This action is not reversible. Please be certain.
            </p>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label
                  for="blogNameDelete"
                  class="form-label"
                  style="font-size: 0.9em"
                  >Enter the blog name
                  <b>{{ title }}</b>
                  to continue:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="blogNameDelete"
                  name="blogNameDelete"
                  v-model="blogNameDelete"
                />
              </div>
              <div class="mb-3">
                <label
                  for="verifyDelete"
                  class="form-label"
                  style="font-size: 0.9em"
                  >To verify, type <b>delete my blog</b> below:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="verifyDelete"
                  name="verifyDelete"
                  v-model="verifyDelete"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click.prevent="showDeleteModal = false"
            >
              Close
            </button>
            <button
              type="button"
              @click.prevent="handleDeleteBlog"
              class="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
import BlogPreview from "@/components/BlogPreview.vue";
import instance from "@/axios/instance";
import BlogImagePreview from "@/components/BlogImagePreview.vue";
import { QuillEditor } from "@vueup/vue-quill";
import { useToast } from "vue-toastification";
export default {
  name: "BlogEdit",
  components: { Modal, BlogImagePreview, QuillEditor, BlogPreview },
  data() {
    return {
      title: null,
      imagePreview: null,
      imageFile: null,
      image: null,
      editor: null,
      content: null,
      showPreviewImage: false,
      isLoading: true,
      datePost: null,
      author_id: null,
      showBlogPreview: false,
      showDeleteModal: false,
      blogNameDelete: "",
      verifyDelete: "",
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async onEditorReady(editor) {
      if (
        this.title === null ||
        this.content === null ||
        this.imagePreview === null
      ) {
        this.isLoading = true;
        try {
          if (this.$store.state.blogUsers) {
            this.$store.state.blogUsers.forEach((blog) => {
              if (blog._id === this.$route.params.id) {
                this.title = blog.blogTitle;
                this.imagePreview = blog.blogImage;
                this.content = blog.blogHTML;
                this.datePost = blog.datePost;
                this.author_id = blog.author_id;
                if (this.author_id !== this.$store.state.userData._id) {
                  this.$router.push({ name: "Blog" });
                }
              }
            });
          } else {
            const response = await instance.get(
              `/blog/getBlog/${this.$route.params.id}`
            );
            this.title = response.data.blog.blogTitle;
            this.imagePreview = response.data.blog.blogImage;
            this.content = response.data.blog.blogHTML;
            this.datePost = response.data.blog.datePost;
            this.author_id = response.data.blog.author_id;
            if (this.author_id !== this.$store.state.userData._id) {
              this.$router.push({ name: "Blog" });
            }
          }
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoading = false;
        }
      }

      this.editor = editor;
      this.editor.root.innerHTML = this.content;
      this.editor.on("text-change", this.handleEditorInput);
    },
    toggleShowImage() {
      this.showPreviewImage = !this.showPreviewImage;
    },
    toggleDeleteModal() {
      this.showDeleteModal = !this.showDeleteModal;
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.image = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },
    handleEditorInput() {
      this.content = this.editor.root.innerHTML;
    },
    handleBlogPreview() {
      if (!this.title) {
        this.toast.warning("Title is required", {
          position: "bottom-right",
        });
        return;
      }
      if (!this.imagePreview) {
        this.toast.warning("Image is required", {
          position: "bottom-right",
        });
        return;
      }
      if (!this.content) {
        this.toast.warning("Content is required", {
          position: "bottom-right",
        });
        return;
      }
      this.showBlogPreview = true;
    },

    async handleDeleteBlog() {
      if (this.blogNameDelete !== this.title) {
        this.toast.warning("Blog name does not match", {
          position: "bottom-right",
        });
        return;
      }
      if (this.verifyDelete !== "delete my blog") {
        this.toast.warning("Please type 'delete my blog' to continue", {
          position: "bottom-right",
        });
        return;
      }
      this.showDeleteModal = false;
      this.isLoading = true;
      try {
        const response = await instance.delete(
          `/blog/delete/${this.$route.params.id}`
        );
        this.toast.success(response.data.message, {
          position: "bottom-right",
        });
        this.$store.dispatch("getAllBlogs");
        this.$store.dispatch("getBlogByUserId");
        this.$router.push({ name: "Blog" });
      } catch (error) {
        console.log(error);
        this.toast.error(error.response.data.message, {
          position: "bottom-right",
        });
      }
      this.isLoading = false;
    },

    async handleUpdateBlog() {
      this.isLoading = true;
      if (!this.title) {
        this.toast.warning("Title is required", {
          position: "bottom-right",
        });
        this.isLoading = false;
        return;
      }

      if (!this.content) {
        this.toast.warning("Content is required", {
          position: "bottom-right",
        });
        this.isLoading = false;
        return;
      }
      const formData = new FormData();
      formData.append("blogId", this.$route.params.id);
      formData.append("blogTitle", this.title);
      formData.append("blogHTML", this.content);
      formData.append("blogImage", this.image);
      formData.append("datePost", this.datePost);
      try {
        const response = await instance.put("/blog/update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.toast.success(response.data.message, {
          position: "bottom-right",
        });
        this.$store.dispatch("getAllBlogs");
        this.$store.dispatch("getBlogByUserId");
        this.isLoading = false;
      } catch (error) {
        this.toast.error(error.response.data.message, {
          position: "bottom-right",
        });
        this.isLoading = false;
      }
    },
  },
};
</script>
