<template>
  <div>
    <Navigation v-if="store.state.routerReady && !navigation" />
    <RouterView :class="[!navigation ? 'routerView' : '']"></RouterView>
    <Footer v-if="store.state.routerReady && !navigation" />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
import store from "./store/store";
export default {
  name: "App",
  components: {
    Navigation,
    Footer,
  },
  data() {
    return {
      navigation: null,
    };
  },
  computed: {
    store() {
      return store;
    },
  },
  created() {
    this.checkRoute();
  },
  methods: {
    checkRoute() {
      if (
        this.$route.name === "Login" ||
        this.$route.name === "Register" ||
        this.$route.name === "ForgotPassword" ||
        this.$route.name === "ResetPassword"
      ) {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
.routerView {
  margin-top: 120px;
}
</style>
