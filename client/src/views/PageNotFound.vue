<template>
  <div>
    <section class="page_404">
      <div class="container-fluid w-100 m-0 p-0">
        <div class="row">
          <div class="col-12">
            <div class="col-12 text-center">
              <div class="four_zero_four_bg"></div>
              <div class="mt-4">
                <h3 class="h2">Look like you're lost</h3>

                <p>The page you are looking for not avaible!</p>

                <router-link
                  :to="{ name: 'Home' }"
                  class="link_404 text-decoration-none"
                  >Go to Home</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "PageNotFound",
  data() {
    return {};
  },
};
</script>
<style scoped>
/*======================
    404 page
=======================*/

.page_404 {
  padding: 40px 0;
  background: #fff;
  font-family: "Arvo", serif;
}

.page_404 img {
  width: 100%;
}

.four_zero_four_bg {
  background-image: url(https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif);
  height: 350px;
  background-position: center;
}

.four_zero_four_bg h1 {
  font-size: 80px;
}

.four_zero_four_bg h3 {
  font-size: 80px;
}

.link_404 {
  color: #fff !important;
  padding: 10px 20px;
  background: #6c757d;
  margin: 20px 0;
  display: inline-block;
  transition: all 0.4s;
}
.link_404:hover {
  color: #fff !important;
  background: #333;
}
</style>
