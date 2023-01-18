<template>
  <div class="item-row">{{ source.reference }} - {{ source.id }}</div>
</template>

<script>
export default {
  name: 'item-component',
  props: {
    index: {
      // index of current item
      type: Number,
    },
    source: {
      // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.item-row {
  height: 70px;
}
</style>
