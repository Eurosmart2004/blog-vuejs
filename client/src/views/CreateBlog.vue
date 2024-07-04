<template>
  <div>
    <div v-if="showBlogPreview" class="container p-md-2">
      <BlogPreview @close="showBlogPreview = false" :blog="blog" />
    </div>

    <form v-else class="container my-3" validation="none">
      <h1>Create Blog</h1>
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
                  v-if="this.$store.state.blog && this.$store.state.blog.image"
                  class="text-truncate d-flex justify-content-center align-items-center h-100 m-0"
                >
                  {{
                    this.$store.state.blog.image.name.length > 10
                      ? this.$store.state.blog.image.name.substring(0, 10) +
                        "..."
                      : this.$store.state.blog.image.name
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
          :imageSrc="this.$store.state.blog.imagePreview"
          @close="toggleShowImage"
        />
      </div>

      <button
        @click.prevent="handleCreateBlog"
        type="submit"
        class="btn btn-primary mt-3"
      >
        Create Blog
      </button>
      <button
        @click.prevent="handleBlogPreview"
        type="submit"
        class="btn btn-outline-secondary mt-3 ms-2"
      >
        Preview blog
      </button>
    </form>

    <Modal :isLoading="isLoading" />
  </div>
</template>

<script>
import instance from "@/axios/instance";
import BlogImagePreview from "@/components/BlogImagePreview.vue";
import { QuillEditor } from "@vueup/vue-quill";
import Modal from "../components/Modal.vue";
import { useToast } from "vue-toastification";
import BlogPreview from "@/components/BlogPreview.vue";
export default {
  name: "CreateBlog",
  components: { BlogImagePreview, QuillEditor, Modal, BlogPreview },
  data() {
    return {
      title: "",
      imagePreview: null,
      editor: null,
      showPreviewImage: false,
      imageFile: null,
      isLoading: false,
      showBlogPreview: false,
    };
  },
  computed: {
    blog() {
      return {
        title: this.$store.state.blog.title,
        imagePreview: this.$store.state.blog.imagePreview,
        content: this.$store.state.blog.content,
      };
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  mounted() {
    if (this.$store.state.blog) {
      this.title = this.$store.state.blog.title;
    }
  },
  methods: {
    onEditorReady(editor) {
      this.editor = editor;
      const blog = this.$store.state.blog;
      if (blog) {
        this.title = blog.title;
        this.imagePreview = blog.imagePreview;
        this.editor.root.innerHTML = blog.content;
      }
      this.editor.on("text-change", this.handleEditorInput);
    },
    toggleShowImage() {
      if (this.$store.state.blog.imagePreview)
        this.showPreviewImage = !this.showPreviewImage;
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.$store.commit("setBlogImage", file);
        this.$store.commit("setBlogImagePreview", URL.createObjectURL(file));
      }
    },

    handleEditorInput() {
      const blogHTML = this.editor.root.innerHTML;
      this.$store.commit("setBlogContent", this.editor.root.innerHTML);
    },

    handleBlogPreview() {
      if (!this.title) {
        this.toast.warning("Title is required", {
          position: "bottom-right",
        });
        return;
      }
      if (!this.$store.state.blog.image) {
        this.toast.warning("Image is required", {
          position: "bottom-right",
        });
        return;
      }
      if (!this.$store.state.blog.content) {
        this.toast.warning("Content is required", {
          position: "bottom-right",
        });
        return;
      }
      this.showBlogPreview = true;
    },
    async handleCreateBlog() {
      this.isLoading = true;
      if (!this.title) {
        this.toast.warning("Title is required", {
          position: "bottom-right",
        });
        this.isLoading = false;
        return;
      }
      if (!this.$store.state.blog.image) {
        this.toast.warning("Image is required", {
          position: "bottom-right",
        });
        this.isLoading = false;
        return;
      }
      if (!this.$store.state.blog.content) {
        this.toast.warning("Content is required", {
          position: "bottom-right",
        });
        this.isLoading = false;
        return;
      }
      const formData = new FormData();
      formData.append("blogTitle", this.$store.state.blog.title);
      formData.append("blogHTML", this.$store.state.blog.content);
      formData.append("blogImage", this.$store.state.blog.image);
      formData.append("datePost", new Date().toISOString().split("T")[0]);
      try {
        const response = await instance.post("/blog/create", formData, {
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
        this.$store.commit("setBlogTitle", null);
        this.$store.commit("setBlogContent", null);
        this.$store.commit("setBlogImage", null);
        this.$store.commit("setBlogImagePreview", null);
      } catch (error) {
        this.toast.error(error.response.data.message, {
          position: "bottom-right",
        });
        this.isLoading = false;
      }
    },
  },
  watch: {
    title(newTitle) {
      this.$store.commit("setBlogTitle", newTitle);
    },
  },
};
</script>
