<template>
  <vue-awesome-paginate
    :total-items="totalItems"
    v-model="currentPage"
    :items-per-page="itemPerPage"
    :max-pages-shown="4"
    @click="onClickHandler"
    paginate-buttons-class="page-link"
    active-page-class="active"
    disabledPaginateButtonsClass="disabled"
    paginationContainerClass="pagination mb-0"
    prev-button-content="<"
    next-button-content=">"
  >
  </vue-awesome-paginate>
</template>
<script>
export default {
  name: "Pagination",
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    itemPerPage: {
      type: Number,
      default: 4,
    },
  },
  computed: {
    currentPage() {
      return this.page;
    },
  },
  methods: {
    onClickHandler(page) {
      this.$emit("pageChange", page);
    },
  },
};
</script>
