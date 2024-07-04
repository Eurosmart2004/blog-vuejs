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
                      <h3>Sign in</h3>
                      <p>
                        Don't have an account?
                        <router-link
                          :to="{ name: 'Register' }"
                          class="text-black"
                          >Sign up</router-link
                        >
                      </p>
                    </div>
                  </div>
                </div>
                <form action="#" validation="none">
                  <div class="row gy-3 overflow-hidden">
                    <div class="col-12">
                      <div class="form-floating">
                        <div
                          class="input-group"
                          :class="[
                            !isValidate || errorMessage.email === ''
                              ? 'mb-3'
                              : '',
                          ]"
                        >
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
                            :class="[
                              !isValidate
                                ? ''
                                : errorMessage.email !== ''
                                ? 'is-invalid'
                                : 'is-valid',
                            ]"
                          />
                        </div>
                        <div class="invalid-feedback d-block">
                          {{ errorMessage.email }}
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-floating">
                        <div
                          class="input-group"
                          :class="[
                            !isValidate || errorMessage.password === ''
                              ? 'mb-3'
                              : '',
                          ]"
                        >
                          <span class="input-group-text">
                            <i
                              class="fa-solid fa-lock p-1"
                              style="font-size: 1.25em"
                            ></i>
                          </span>
                          <input
                            :type="showPassword ? 'text' : 'password'"
                            class="form-control"
                            placeholder="Password"
                            aria-label="Password"
                            v-model="password"
                            :class="[
                              !isValidate
                                ? ''
                                : errorMessage.password !== ''
                                ? 'is-invalid'
                                : 'is-valid',
                            ]"
                            autocomplete="new-password"
                          />
                          <p
                            @click.prevent="togglePassword"
                            class="input-group-text m-0"
                          >
                            <i
                              v-if="!showPassword"
                              class="fa-regular fa-eye p-1"
                              style="font-size: 1.25em"
                            ></i>
                            <i
                              v-else
                              class="fa-regular fa-eye-slash p-1"
                              style="font-size: 1.25em"
                            ></i>
                          </p>
                        </div>
                        <div class="invalid-feedback d-block">
                          {{ errorMessage.password }}
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="d-grid">
                        <button
                          @click.prevent="handleSubmit"
                          class="btn btn-primary"
                          type="submit"
                        >
                          Log in
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div class="row">
                  <div class="col-12">
                    <div
                      class="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end mt-4"
                    >
                      <router-link :to="{ name: 'ForgotPassword' }"
                        >Forgot password</router-link
                      >
                    </div>
                  </div>
                </div>
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
  name: "Login",
  components: { Modal },
  data() {
    const errorMessage = {
      email: "",
      password: "",
    };
    return {
      isValidate: false,
      showPassword: false,
      errorMessage,
      email: "",
      password: "",
      isLoading: false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    validateForm() {
      // Email check
      if (!this.email) {
        this.errorMessage.email = "Email is required";
      } else {
        let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

        if (!emailRegex.test(this.email)) {
          this.errorMessage.email = "Email is invalid";
        } else {
          this.errorMessage.email = "";
        }
      }

      // Password check
      if (!this.password) {
        this.errorMessage.password = "Password is required";
      } else {
        if (this.password.length < 8) {
          this.errorMessage.password = "Password must be at least 8 characters";
        } else if (!/[^\w\s]|[_$%^&*]/.test(this.password)) {
          this.errorMessage.password =
            "Password must contain at least one special character ($, %, ^, &, *)";
        } else {
          this.errorMessage.password = "";
        }
      }
    },
    async handleSubmit() {
      this.isLoading = true;
      this.isValidate = true;
      this.validateForm();
      if (this.errorMessage.email === "" && this.errorMessage.password === "") {
        try {
          let response = await instance.post("/user/login", {
            email: this.email,
            password: this.password,
          });
          this.toast.success("Login successful", {
            position: "bottom-right",
          });
          instance.defaults.headers.common.Authorization = `Bearer ${response.data.user.token}`;
          this.$store.commit("setUserData", response.data.user);
          localStorage.setItem("isLoggedIn", "true");
          this.$router.push({ name: "Home" });
        } catch (error) {
          console.log(error);
          this.toast.error(error.response.data.message);
        }
      }
      this.isLoading = false;
    },
  },
};
</script>
