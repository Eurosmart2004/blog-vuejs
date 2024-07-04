<template>
  <div class="">
    <Modal :isLoading="isLoading" />
    <section class="bg-body-secondary py-3 py-md-5 py-xl-8 min-vh-100">
      <div class="container">
        <div class="row gy-4 align-items-center">
          <div class="col-12 col-md-6 col-xl-7">
            <div class="d-flex justify-content-center bg-body-secondary">
              <div class="col-12 col-xl-9">
                <div class="d-flex justify-content-center align-self-center">
                  <router-link :to="{ name: 'Home' }">
                    <img
                      class="img-fluid rounded"
                      loading="lazy"
                      src="../assets/logo/logo.png"
                      alt="Vue blog Logo"
                      style="max-height: 250px"
                    />
                  </router-link>
                </div>
                <hr class="mb-4" />
                <h2 class="h1 mb-4">
                  Welcome to our blog, where we share our insights on digital
                  trends.
                </h2>
                <p class="lead mb-5">
                  Dive into our blog to explore thought-provoking articles,
                  inspiring photo stories, insightful videos.
                </p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-xl-5">
            <div class="card border-0 rounded-4">
              <div class="card-body p-3 p-md-4 p-xl-5">
                <div class="row">
                  <div class="col-12">
                    <div class="mb-4">
                      <h3>Reset Password</h3>
                      <p>
                        Forgot your password ? Enter your email address to reset
                      </p>
                    </div>
                  </div>
                </div>
                <form action="#!">
                  <div class="row gy-3 overflow-hidden">
                    <div class="col-12">
                      <div class="form-floating mb-3">
                        <div class="input-group mb-3">
                          <span class="input-group-text">
                            <i
                              class="fa-regular fa-envelope p-1"
                              style="font-size: 1.25em"
                            ></i>
                          </span>
                          <input
                            type="email"
                            class="form-control"
                            placeholder="Email"
                            aria-label="Email"
                            v-model="email"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="d-grid">
                        <button
                          @click.prevent="handleForgotPassword"
                          class="btn btn-primary"
                          type="submit"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import instance from "@/axios/instance";
import { useToast } from "vue-toastification";
import Modal from "@/components/Modal.vue";

export default {
  name: "ForgotPassword",
  components: { Modal },
  data() {
    return {
      email: "",
      isLoading: false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async handleForgotPassword() {
      this.isLoading = true;
      try {
        const response = await instance.post("/user/forgotPassword", {
          email: this.email,
        });
        this.toast.success(response.data.message);
      } catch (error) {
        console.log(error);
        this.toast.error(error.response.data.message);
      }
      this.isLoading = false;
    },
  },
};
</script>
