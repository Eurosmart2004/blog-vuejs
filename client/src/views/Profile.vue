<template>
  <div>
    <div class="container my-3">
      <Modal :isLoading="isLoading" />
      <h1>Profile setting</h1>
      <div class="my-2 flex-row d-inline-flex pb-3">
        <span class="fs-6">Toggle Editing</span>
        <input
          class="ms-4"
          type="checkbox"
          v-model="editPost"
          style="cursor: pointer"
        />
      </div>
      <!-- Field chosen to edit -->
      <div class="row col-12 col-lg-6">
        <div class="col-6 col-lg-4">
          <p
            :class="typeEdit === 'Profile' ? 'active' : 'text-black-50'"
            class="pb-1 mb-0 text-center h-100"
            style="cursor: pointer"
            @click="typeEdit = 'Profile'"
          >
            Edit profile
          </p>
        </div>
        <div class="col-6 col-lg-4">
          <p
            :class="typeEdit === 'Password' ? 'active' : 'text-black-50'"
            class="pb-1 mb-0 text-center h-100"
            style="cursor: pointer"
            @click="typeEdit = 'Password'"
          >
            Change password
          </p>
        </div>
        <div class="col-12">
          <hr class="m-0 mb-2" />
        </div>
      </div>
      <form v-if="typeEdit === 'Profile'" validation="none">
        <!-- Profile edit -->
        <div class="row">
          <div class="col-12 col-lg-6">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                autocomplete="off"
                v-model="email"
                disabled="true"
              />
            </div>
            <div class="mb-3">
              <label for="firstName" class="form-label">First name</label>
              <input
                type="text"
                class="form-control"
                id="firstName"
                autocomplete="off"
                v-model="firstName"
                :disabled="!editPost"
              />
            </div>
            <div class="mb-3">
              <label for="lastName" class="form-label">Last name</label>
              <input
                type="text"
                class="form-control"
                id="lastName"
                autocomplete="off"
                v-model="lastName"
                :disabled="!editPost"
              />
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="mb-3">
              <label for="profileImage" class="form-label">Profile Image</label>
              <input
                type="file"
                class="form-control"
                id="profileImage"
                autocomplete="off"
                accept=".png, .jpg, .jpeg"
                @change="previewImage"
                :disabled="!editPost"
              />
              <div v-if="imagePreview" class="mt-3 center-content">
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  class="rounded-circle img-fluid"
                  style="width: 150px; height: 150px"
                  alt="Avatar"
                />
              </div>
              <div v-else>
                <div v-if="userData.imagePath" class="center-content mt-3">
                  <img
                    :src="userData.imagePath"
                    class="rounded-circle"
                    alt="Avatar"
                    style="width: 150px; height: 150px"
                  />
                </div>
                <div v-else class="p-0 center-content mt-3">
                  <p
                    class="fs-1 p-2 m-0 border rounded-circle bg-secondary text-white d-inline-flex justify-content-center align-items-center"
                    style="width: 150px; height: 150px"
                  >
                    {{ userData.firstName[0] }}
                    {{ userData.lastName[0] }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          @click.prevent="handleEditProfile"
          type="submit"
          class="btn btn-primary"
          :disabled="!allowUpdate"
        >
          Update profile
        </button>
      </form>
      <!-- End profile edit -->
      <!-- Password change -->
      <form v-if="typeEdit === 'Password'" action="#" validation="none">
        <div class="row">
          <div class="col-12 order-2 order-lg-1 col-lg-6">
            <div class="mb-3">
              <label for="oldPassword" class="form-label">Old password</label>
              <div class="input-group">
                <input
                  :type="showOldPassword ? 'text' : 'password'"
                  class="form-control"
                  id="oldPassword"
                  autocomplete="off"
                  v-model="oldPassword"
                  :disabled="!editPost"
                />
                <p
                  @click.prevent="showOldPassword = !showOldPassword"
                  class="input-group-text m-0"
                >
                  <i
                    v-if="!showOldPassword"
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
            </div>
            <div class="mb-3">
              <label for="newPassword" class="form-label">New password</label>
              <div class="input-group">
                <input
                  :type="showNewPassword ? 'text' : 'password'"
                  class="form-control"
                  id="newPassword"
                  autocomplete="off"
                  v-model="newPassword"
                  :disabled="!editPost"
                />
                <p
                  @click.prevent="showNewPassword = !showNewPassword"
                  class="input-group-text m-0"
                >
                  <i
                    v-if="!showNewPassword"
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
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label"
                >Confirm password</label
              >
              <div class="input-group">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="form-control"
                  id="confirmPassword"
                  autocomplete="off"
                  v-model="confirmPassword"
                  :disabled="!editPost"
                />
                <p
                  @click.prevent="showConfirmPassword = !showConfirmPassword"
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
            </div>
            <button
              @click.prevent="handleChangePassword"
              type="submit"
              class="btn btn-primary"
              :disabled="!validatePasswordDisable"
            >
              Change password
            </button>
          </div>

          <div class="col-12 order-1 order-lg-2 col-lg-6">
            <ul class="my-3">
              <li
                class="list-unstyled"
                :class="
                  oldPassword === '' ||
                  newPassword === '' ||
                  confirmPassword === ''
                    ? 'text-danger'
                    : 'text-success text-decoration-line-through'
                "
              >
                All field are required
              </li>
              <li
                class="list-unstyled"
                :class="
                  oldPassword === newPassword
                    ? 'text-danger'
                    : 'text-success text-decoration-line-through'
                "
              >
                New password must be different from old password
              </li>
              <li
                class="list-unstyled"
                :class="
                  newPassword.length < 8
                    ? 'text-danger'
                    : 'text-success text-decoration-line-through'
                "
              >
                New password must have at least 8 characters
              </li>
              <li
                class="list-unstyled"
                :class="
                  !/[^\w\s]|[_$%^&*]/.test(newPassword)
                    ? 'text-danger'
                    : 'text-success text-decoration-line-through'
                "
              >
                New password must contain at least one special character ($, %,
                ^, &, *)
              </li>
              <li
                class="list-unstyled"
                :class="
                  !/[A-Z]/.test(newPassword)
                    ? 'text-danger'
                    : 'text-success text-decoration-line-through'
                "
              >
                New password must contain at least one uppercase letter
              </li>
              <li
                class="list-unstyled"
                :class="
                  newPassword !== confirmPassword
                    ? 'text-danger'
                    : 'text-success text-decoration-line-through'
                "
              >
                Confirm password must match new password
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import instance from "@/axios/instance";
import store from "@/store/store";
import { useToast } from "vue-toastification";
import Modal from "../components/Modal.vue";
export default {
  name: "Profile",
  components: {
    Modal,
  },
  data() {
    return {
      firstName: store.state.userData.firstName,
      lastName: store.state.userData.lastName,
      email: store.state.userData.email,
      password: store.state.userData.password,
      profileImage: store.state.userData.imagePath,
      imagePreview: null,
      isLoading: false,
      editPost: false,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      typeEdit: "Profile",
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  computed: {
    userData() {
      return store.state.userData;
    },
    allowUpdate() {
      return (
        this.firstName !== store.state.userData.firstName ||
        this.lastName !== store.state.userData.lastName ||
        (this.imagePreview !== store.state.userData.profileImage &&
          this.imagePreview !== null)
      );
    },
    validatePasswordDisable() {
      if (
        this.oldPassword === "" ||
        this.newPassword === "" ||
        this.confirmPassword === ""
      ) {
        return false;
      }

      if (this.newPassword.length < 8) {
        return false;
      }

      if (!/[^\w\s]|[_$%^&*]/.test(this.newPassword)) {
        return false;
      }

      if (this.oldPassword === this.newPassword) {
        return false;
      }

      if (!/[A-Z]/.test(this.newPassword)) {
        return false;
      }

      if (this.newPassword !== this.confirmPassword) {
        return false;
      }
      return true;
    },
  },
  methods: {
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.imagePreview = URL.createObjectURL(file);
      }
    },

    validateProfile() {
      if (!this.firstName || !this.lastName) {
        this.toast.error("First name and last name are required", {
          position: "bottom-right",
        });
        return false;
      }

      const nameRegex = /^[A-Za-z]+$/;
      if (!nameRegex.test(this.firstName) || !nameRegex.test(this.lastName)) {
        this.toast.error(
          "First name and last name should only contain letters",
          {
            position: "bottom-right",
          }
        );
        return false;
      }
      return true;
    },

    async handleEditProfile() {
      this.isLoading = true;
      if (!this.validateProfile()) {
        this.isLoading = false;
        return;
      }
      if (!this.allowUpdate) {
        this.toast.info("No changes", {
          position: "bottom-right",
        });
        this.isLoading = false;
        return;
      }
      const formData = new FormData();
      formData.append("firstName", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("email", this.email);
      // Assuming you have a reference to the file input
      const fileInput = document.querySelector("#profileImage");
      if (fileInput.files[0]) {
        formData.append("profileImage", fileInput.files[0]);
      }

      try {
        const response = await instance.put("/user/updateUser", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.toast.success(response.data.message, {
          position: "bottom-right",
        });
        let userData = response.data.user;
        store.commit("setUserData", userData);

        // handle response
      } catch (error) {
        // handle error
        console.log(error);
        this.toast.error(error.response.data.message, {
          position: "bottom-right",
        });
      }
      this.isLoading = false;
    },

    validatePassword() {
      if (
        this.oldPassword === "" ||
        this.newPassword === "" ||
        this.confirmPassword === ""
      ) {
        return false;
      }

      if (this.newPassword.length < 8) {
        return false;
      }

      if (!/[^\w\s]|[_$%^&*]/.test(this.newPassword)) {
        return false;
      }

      if (this.oldPassword === this.newPassword) {
        return false;
      }

      if (!/[A-Z]/.test(this.newPassword)) {
        return false;
      }

      if (this.newPassword !== this.confirmPassword) {
        return false;
      }
      return true;
    },

    async handleChangePassword() {
      this.isLoading = true;
      if (!this.validatePassword()) {
        this.isLoading = false;
        return;
      }
      try {
        const response = await instance.put("/user/changePassword", {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        });
        this.toast.success(response.data.message, {
          position: "bottom-right",
        });
        this.oldPassword = "";
        this.newPassword = "";
        this.confirmPassword = "";
      } catch (error) {
        console.log(error);
        this.toast.error(error.response.data.message, {
          position: "bottom-right",
        });
      }
      this.isLoading = false;
    },
  },
};
</script>
<style scoped>
input[type="checkbox"] {
  position: relative;
  border: none;
  -webkit-appearance: none;
  background: #fff;
  outline: none;
  width: 60px;
  height: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

input[type="checkbox"]:before {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  top: 0;
  left: 0;
  background: #fff;
  transform: scale(1.1);
  transition: 750ms ease all;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

input:checked[type="checkbox"]:before {
  background: #303030;
  left: 52px;
}
.center-content {
  display: grid;
  place-items: center;
}

.active {
  border-bottom: 2px solid #495057;
  color: #000000;
}
</style>
