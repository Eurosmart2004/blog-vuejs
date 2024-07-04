<template>
  <div>
    <div class="modal show d-block" tabindex="-1" @click="closeModal">
      <div class="modal-dialog">
        <div class="modal-content" @click.stop>
          <div class="modal-body">
            <img :src="imageSrc" class="img-fluid" alt="Blog Image" />
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show"></div>
  </div>
</template>

<script>
export default {
  name: "BlogImagePreview",
  props: ["imageSrc"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
