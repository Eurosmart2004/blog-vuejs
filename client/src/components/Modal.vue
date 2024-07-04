<template>
  <div
    class="modal fade show d-block"
    id="loadingModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="loadingModalLabel"
    aria-hidden="true"
    v-if="isLoading"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    showLoading() {
      this.isLoading = true;
    },
    hideLoading() {
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
