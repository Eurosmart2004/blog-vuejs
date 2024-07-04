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
                      <h3>Sign up</h3>
                      <p>
                        Already have an account ?
                        <router-link :to="{ name: 'Login' }" class="text-black"
                          >Login</router-link
                        >
                      </p>
                    </div>
                  </div>
                </div>
                <form action="#!" class="">
                  <div class="row gy-3 overflow-hidden">
                    <!-- First name -->
                    <div class="col-12">
                      <div class="form-floating">
                        <div
                          class="input-group"
                          :class="[
                            !isValidate || errorMessage.firstName === ''
                              ? 'mb-3'
                              : '',
                          ]"
                        >
                          <span class="input-group-text">
                            <i
                              class="fa-regular fa-user p-1"
                              style="font-size: 1.25em"
                            ></i>
                          </span>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="First name"
                            aria-label="First name"
                            v-model="firstName"
                            :class="[
                              !isValidate
                                ? ''
                                : errorMessage.firstName !== ''
                                ? 'is-invalid'
                                : 'is-valid',
                            ]"
                          />
                        </div>
                        <div class="invalid-feedback d-block">
                          {{ errorMessage.firstName }}
                        </div>
                      </div>
                    </div>
                    <!-- /First name -->
                    <!-- Last name -->
                    <div class="col-12">
                      <div class="form-floating">
                        <div
                          class="input-group"
                          :class="[
                            !isValidate || errorMessage.lastName === ''
                              ? 'mb-3'
                              : '',
                          ]"
                        >
                          <span class="input-group-text">
                            <i
                              class="fa-regular fa-user p-1"
                              style="font-size: 1.25em"
                            ></i>
                          </span>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Last name"
                            aria-label="Last name"
                            v-model="lastName"
                            :class="[
                              !isValidate
                                ? ''
                                : errorMessage.lastName !== ''
                                ? 'is-invalid'
                                : 'is-valid',
                            ]"
                          />
                        </div>
                        <div class="invalid-feedback d-block">
                          {{ errorMessage.lastName }}
                        </div>
                      </div>
                    </div>
                    <!-- /Last name -->
                    <!-- Email -->
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
                    <!-- /Email -->
                    <!-- Password -->
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
                    <!-- /Password -->
                    <!-- Confirm Password -->
                    <div class="col-12">
                      <div class="form-floating">
                        <div
                          class="input-group"
                          :class="[
                            !isValidate || errorMessage.confirmPassword === ''
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
                            :type="showConfirmPassword ? 'text' : 'password'"
                            class="form-control"
                            placeholder="Confirm password"
                            aria-label="Password"
                            v-model="confirmPassword"
                            :class="[
                              !isValidate
                                ? ''
                                : errorMessage.confirmPassword !== ''
                                ? 'is-invalid'
                                : 'is-valid',
                            ]"
                          />
                          <p
                            @click.prevent="toggleConfirmPassword"
                            class="input-group-text m-0"
                          >
                            <i
                              v-if="!showConfirmPassword"
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
                          {{ errorMessage.confirmPassword }}
                        </div>
                      </div>
                    </div>
                    <!-- /Confirm password -->
                    <div class="col-12">
                      <div class="d-grid">
                        <button
                          @click.prevent="handleSubmit"
                          class="btn btn-primary"
                          type="submit"
                        >
                          Register
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
import "vue-toastification/dist/index.css";
import Modal from "@/components/Modal.vue";
export default {
  name: "Register",
  components: { Modal },
  data() {
    const errorMessage = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    return {
      showPassword: false,
      showConfirmPassword: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage,
      isValidate: false,
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
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    validateForm() {
      this.isValidate = true;

      // Firstname check
      if (!this.firstName) {
        this.errorMessage.firstName = "First name is required";
      } else if (!/^[a-zA-Z]+$/.test(this.firstName)) {
        this.errorMessage.firstName = "First name can only contain letters";
      } else {
        this.errorMessage.firstName = "";
      }

      // Lastname check
      if (!this.lastName) {
        this.errorMessage.lastName = "Last name is required";
      } else if (!/^[a-zA-Z]+$/.test(this.lastName)) {
        this.errorMessage.lastName = "Last name can only contain letters";
      } else {
        this.errorMessage.lastName = "";
      }

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
        } else if (!/[A-Z]/.test(this.password)) {
          this.errorMessage.password =
            "Password must contain at least one uppercase letter";
        } else if (!/[^\w\s]|[_$%^&*]/.test(this.password)) {
          this.errorMessage.password =
            "Password must contain at least one special character ($, %, ^, &, *)";
        } else {
          this.errorMessage.password = "";
        }
      }

      if (!this.confirmPassword) {
        this.errorMessage.confirmPassword = "Confirm password is required";
      } else {
        if (this.password !== this.confirmPassword) {
          this.errorMessage.confirmPassword = "Password does not match";
        } else {
          this.errorMessage.confirmPassword = "";
        }
      }
    },
    async handleSubmit() {
      this.isLoading = true;
      this.validateForm();
      if (
        this.errorMessage.firstName === "" &&
        this.errorMessage.lastName === "" &&
        this.errorMessage.email === "" &&
        this.errorMessage.password === "" &&
        this.errorMessage.confirmPassword === ""
      ) {
        try {
          let response = await instance.post("/user/register", {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
          });
          this.toast.success("Registration successful", {
            position: "bottom-right",
          });

          let response_login = await instance.post("/user/login", {
            email: this.email,
            password: this.password,
          });
          instance.defaults.headers.common.Authorization = `Bearer ${response_login.data.user.token}`;
          this.$store.commit("setUserData", response_login.data.user);
          localStorage.setItem("isLoggedIn", "true");
          this.$router.push({ name: "Home" });

          console.log(response);
        } catch (error) {
          console.log(error.response.data.message);
          this.toast.error(error.response.data.message);
        }
      }
      this.isLoading = false;
    },
  },
};
</script>
