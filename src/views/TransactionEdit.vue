<template>
  <div>Transaction EDIT {{ getId }}</div>
</template>

<script>
export default {
  computed: {
    getId() {
      return this.$route.params.id;
    },
  },
};
</script>
