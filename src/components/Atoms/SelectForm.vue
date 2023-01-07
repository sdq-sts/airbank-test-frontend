<template>
  <div class="relative rounded-md">
    <label for="select" class="block text-sm font-medium leading-5">
      <span class="font-medium text-sm text-gray-400">{{ label }}</span>
      <select @change="handleSelect" v-model="selectedOption" id="select" :class="selectStyle">
        <option v-for="option in options" :value="option.value" :key="option.value" class="text-base text-gray-500">
          {{ option.text }}
        </option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-5 flex items-center px-2">
        <v-icon name="chevron-down" class="fill-gray-300 absolute bottom-[14px] pointer-events-none" scale="1.2" />
      </div>
    </label>
  </div>
</template>

<script>
import 'vue-awesome/icons/chevron-down';

export default {
  props: {
    label: {
      type: String,
      default: 'Select',
    },
    options: {
      default: () => [
        { value: '', text: 'No filter applied' },
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2' },
        { value: 'option3', text: 'Option 3' },
      ],
    },
  },

  data() {
    return {
      selectedOption: '',

      selectStyle: `
        form-input
        bg-transparent
        text-gray-500
        text-base
        appearance-none
        w-full
        mt-2
        leading-7
        rounded
        border
        border-gray-300
        focus:outline-gray-300
        py-2
        pl-9
      `,
    };
  },

  methods: {
    handleSelect() {
      console.log('WTF');
      this.$emit('input', this.selectedOption);
    },
  },
};
</script>
