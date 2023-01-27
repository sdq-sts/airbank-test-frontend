<template>
  <div class="dropdown w-2/4 relative">
    <label for="dropdown">
      <p class="text-xs text-gray-400 mb-2">{{ label }}</p>
      <div class="flex gap-8 columns-12">
        <div class="input-wrapper w-7/12 relative">
          <input
            @click="showOptions = !showOptions"
            @input="$emit('input', $event)"
            class="form-input pl-3 w-full text-gray-500 text-base mt-1 leading-7 rounded border border-gray-300 focus:outline-gray-300 py-2"
            name="dropdown"
            type="text"
            :disabled="selectedOption"
          />
          <div v-if="selectedOption" class="absolute bottom-3 left-2">
            <BasePill :text="selectedOption.text" :color="selectedOption.color" />
          </div>

          <div class="icons absolute bottom-3 right-3">
            <div
              v-if="selectedOption"
              @click="selectedOption = null"
              @keydown="selectedOption = null"
              class="clear-selection fill-gray-300 cursor-pointer"
            >
              <v-icon name="times" scale="1.2" />
            </div>
            <div v-if="!options.length && !selectedOption" class="clear-selection fill-gray-300 cursor-pointer">
              <v-icon name="palette" scale="1.2" />
            </div>
          </div>

          <div v-if="showOptions" class="relative">
            <div class="options cursor-pointer bg-white block absolute top: 0 left-0 right-0 max-h-96 overflow-y-auto">
              <div v-for="option in options" :key="option.id" class="p-2" @click="handleSelected(option)" @keydown="handleSelected(option)">
                <BasePill :text="option.text" :color="option.color" />
              </div>
            </div>
          </div>
        </div>
        <div class="btn-wrapper w-5/12">
          <button v-if="!options.length" class="bg-blue-500 p-3 ml-5 block rounded-md text-white">Create category</button>
        </div>
      </div>
    </label>
  </div>
</template>

<script>
import 'vue-awesome/icons/times';
import 'vue-awesome/icons/palette';
import BasePill from '@/components/Atoms/BasePill.vue';

export default {
  components: {
    BasePill,
  },

  props: {
    label: {
      type: String,
      default: 'Dropdown label',
    },

    selected: {
      type: Object,
      default: null,
    },

    options: {
      type: Array,
      default: () => [
        { id: 1, text: 'Inventory', color: '7048a3' },
        { id: 2, text: 'Sales', color: '958e80' },
        { id: 3, text: 'Management', color: 'ffbf84' },
        { id: 4, text: 'Inventory', color: '7048a3' },
        { id: 5, text: 'Sales', color: '958e80' },
        { id: 6, text: 'Management', color: 'ffbf84' },
        { id: 7, text: 'Inventory', color: '7048a3' },
        { id: 8, text: 'Sales', color: '958e80' },
        { id: 9, text: 'Management', color: 'ffbf84' },
        { id: 10, text: 'Inventory', color: '7048a3' },
        { id: 11, text: 'Sales', color: '958e80' },
        { id: 12, text: 'Management', color: 'ffbf84' },
      ],
    },
  },

  data() {
    return {
      showOptions: false,
      selectedOption: null,
    };
  },

  methods: {
    handleSelected(option) {
      this.$emit('selected', option);
      this.selectedOption = option;
      this.showOptions = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.options {
  &::-webkit-scrollbar {
    width: 0.4em;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #000;
  }
}
</style>
