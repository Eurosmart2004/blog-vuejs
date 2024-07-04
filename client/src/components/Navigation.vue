<template>
  <header>
    <nav class="navbar navbar-expand-lg p-3 px-lg-5 fixed-top bg-white">
      <div class="container-fluid">
        <router-link class="navbar-brand" :to="{ name: 'Home' }">
          <img
            src="../assets/logo/logo.png"
            alt="Logo"
            width="70"
            height="70"
            class="img-fluid rounded"
            style="transform: scale(1.7)"
          />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse px-lg-5" id="navbarNavDropdown">
          <ul class="navbar-nav ms-auto">
            <li class="mb-2 me-2">
              <router-link
                class="nav-link mx-2 h-100 d-flex align-items-center"
                :class="{ active: isActive('Home') }"
                :to="{ name: 'Home' }"
                >Home</router-link
              >
            </li>
            <li class="mb-2 me-2">
              <router-link
                class="nav-link mx-2 h-100 d-flex align-items-center"
                :class="{ active: isActive('Blog') }"
                :to="{ name: 'Blog' }"
                >Blog
              </router-link>
            </li>
            <li class="mb-2 me-2" v-if="userData === null">
              <router-link
                class="nav-link mx-2 h-100 d-flex align-items-center"
                :class="{ active: isActive('login-register') }"
                :to="{ name: 'Login' }"
                >Login
              </router-link>
            </li>
            <li class="mb-2 me-2" v-if="userData !== null">
              <router-link
                class="nav-link mx-2 h-100 d-flex align-items-center"
                :class="{ active: isActive('CreateBlog') }"
                :to="{ name: 'CreateBlog' }"
                >Create Blog
              </router-link>
            </li>
            <li class="dropdown" v-if="userData !== null">
              <button
                class="border-0 bg-white"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div v-if="userData.imagePath">
                  <img
                    :src="userData.imagePath"
                    class="rounded-circle image-avatar"
                    alt="Avatar"
                    style="width: 50px; height: 50px"
                  />
                </div>
                <div v-else>
                  <p
                    class="p-2 m-0 border rounded-circle bg-secondary text-white d-inline-flex justify-content-center align-items-center"
                    style="width: 50px; height: 50px"
                  >
                    {{ userData.firstName[0] }} {{ userData.lastName[0] }}
                  </p>
                </div>
              </button>
              <ul
                class="dropdown-menu dropdown-menu-end mt-3"
                style="min-width: 300px"
              >
                <li
                  class="d-flex flex-row justify-content-center align-items-center dropdown-item"
                >
                  <router-link
                    class="w-100 pe-1 row text-decoration-none"
                    :to="{ name: 'Profile' }"
                  >
                    <div
                      v-if="userData.imagePath"
                      class="col-3 center-content p-0"
                    >
                      <img
                        :src="userData.imagePath"
                        class="rounded-circle rounded-circle img-fluid"
                        alt="Avatar"
                        style="width: 50px; height: 50px"
                      />
                    </div>
                    <div v-else class="col-3 p-0 center-content">
                      <p
                        class="p-2 m-0 border rounded-circle bg-secondary text-white d-inline-flex justify-content-center align-items-center"
                        style="width: 50px; height: 50px"
                      >
                        {{ userData.firstName[0] }}
                        {{ userData.lastName[0] }}
                      </p>
                    </div>
                    <div class="col-9 ps-1">
                      <p class="m-0 text-black text-truncate">
                        {{ userData.firstName }}
                        {{ userData.lastName }}
                      </p>
                      <p class="m-0 p-0 text-black text-truncate">
                        {{ userData.email }}
                      </p>
                    </div>
                  </router-link>
                </li>
                <hr class="m-2" />
                <button
                  @click="handleLogout"
                  class="d-flex flex-row justify-content-center align-items-center p-3 dropdown-item"
                >
                  Log out
                </button>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import instance from "@/axios/instance";
import { useToast } from "vue-toastification";
export default {
  name: "Navigation",
  components: {},
  setup() {
    const toast = useToast();
    return { toast };
  },
  computed: {
    userData() {
      return this.$store.state.userData;
    },
  },
  created() {
    window.addEventListener("storage", this.checkLoginStatus);
    this.checkLoginStatus();
  },
  beforeDestroy() {
    window.removeEventListener("storage", this.checkLoginStatus);
  },
  methods: {
    isActive(routeName) {
      return this.$route.name === routeName;
    },
    checkLoginStatus() {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "false" && this.$store.state.userData) {
        this.$store.commit("logOut");
        this.$router.push({ name: "Home" });
      }
    },
    async handleLogout() {
      try {
        let response = await instance.post("/user/logout");
        this.toast.success(response.data.message, {
          position: "bottom-right",
        });
        instance.defaults.headers.common["Authorization"] = null;
        this.$store.commit("logOut");
        this.$router.push({ name: "Home" });
        localStorage.setItem("isLoggedIn", "false");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.active {
  /* border-bottom: 1px solid black; */
  position: relative;
}
.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid black;
}
.image-avatar {
  cursor: pointer;
  transition: 0.1s;
}
.image-avatar:hover {
  border: 1px solid black;
}

.center-content {
  display: grid;
  place-items: center;
}
.dropdown-item:active {
  background-color: transparent !important;
}
</style>
