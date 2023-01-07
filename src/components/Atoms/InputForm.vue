<template>
  <div class="relative">
    <label for="search">
      <span class="font-medium text-sm text-gray-400">{{ label }}</span>
      <input
        @input="handleInput"
        id="search"
        type="text"
        class="form-input text-gray-500 text-base w-full mt-1 leading-7 rounded border border-gray-300 focus:outline-gray-300 py-2 pl-9"
      />
      <v-icon name="search" class="search-icon fill-gray-300 absolute bottom-[14px] left-2 pointer-events-none" scale="1.2" />
    </label>
  </div>
</template>

<script>
import 'vue-awesome/icons/search';

export default {
  props: {
    label: {
      type: String,
      default: 'Search',
    },
  },

  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>

<style lang="postcss" scoped></style>
