<template>
  <!-- Footer -->
  <footer
    class="text-center text-lg-start text-white"
    style="background-color: #1c2331"
  >
    <!-- Section: Links  -->
    <section class="">
      <div class="container text-center text-md-start mt-0">
        <!-- Grid row -->
        <div class="row mt-0">
          <!-- Grid column -->
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto my-4">
            <!-- Content -->
            <h6 class="text-uppercase fw-bold">Description</h6>
            <hr
              class="mb-4 mt-0 d-inline-block mx-auto"
              style="width: 60px; background-color: #7c4dff; height: 2px"
            />
            <p>This is blog website</p>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto my-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold">Products</h6>
            <hr
              class="mb-4 mt-0 d-inline-block mx-auto"
              style="width: 60px; background-color: #7c4dff; height: 2px"
            />
            <p>
              <router-link
                :to="{ name: 'Blog' }"
                class="text-white text-decoration-none animated-link"
                >Blog</router-link
              >
            </p>
            <p>
              <router-link
                :to="{ name: 'CreateBlog' }"
                class="text-white text-decoration-none animated-link"
                >Create Blog</router-link
              >
            </p>
          </div>

          <!-- Grid column -->
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 my-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold">Contact</h6>
            <hr
              class="mb-4 mt-0 d-inline-block mx-auto"
              style="width: 60px; background-color: #7c4dff; height: 2px"
            />
            <p>
              <i class="fas fa-home" style="margin-right: 20px"></i>Lot 1+2,
              A14-16, 2/9 Street, Hoa Cuong Bac Ward, Hai Chau District, Da Nang
              550000
            </p>
            <p>
              <i class="fas fa-envelope" style="margin-right: 20px"></i
              >Lequangthien2004@gmail.com
            </p>
          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row -->
      </div>
    </section>
    <!-- Section: Links  -->

    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
      © 2024 Copyright
    </div>
    <!-- Copyright -->
  </footer>
  <!-- Footer -->
</template>

<script>
export default {
  name: "Footer",
  components: {},
};
</script>

<style>
.animated-link {
  position: relative;
  overflow: hidden;
}

.animated-link::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.3s;
}

.animated-link:hover::after {
  width: 100%;
}
</style>
