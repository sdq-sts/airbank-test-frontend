<template>
  <div class="relative">
    <label for="search">
      <span class="font-medium text-sm text-gray-400">{{ label }}</span>
      <input
        @input="handleInput"
        id="search"
        type="text"
        :placeholder="placeholder"
        class="form-input text-gray-500 text-base w-full mt-1 leading-7 rounded border border-gray-300 focus:outline-gray-300 py-2"
        :class="{ 'pl-9': $slots.icon, 'pl-2': !$slots.icon }"
      />
      <span class="search-icon fill-gray-300 absolute bottom-[14px] left-2 pointer-events-none">
        <slot name="icon"></slot>
      </span>
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

    placeholder: {
      type: String,
      default: 'Your placeholder here',
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
