<template>
  <div
    class="modal fade show d-block"
    tabindex="-1"
    role="dialog"
    style="background-color: rgba(0, 0, 0, 0.3)"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete comment</h5>
        </div>
        <div class="modal-body">
          <p>Are you sure to delete comment</p>
        </div>
        <div class="modal-footer">
          <button
            @click.prevent="this.$emit('delete')"
            type="button"
            class="btn btn-danger"
          >
            Delete
          </button>
          <button
            @click.prevent="this.$emit('close')"
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModalDeleteComment",
};
</script>
