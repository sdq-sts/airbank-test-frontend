<template>
  <div class="dropdown w-2/4 relative">
    <label for="dropdown">
      <p class="text-xs text-gray-400 mb-2">{{ label }}</p>
      <div class="flex gap-8 columns-12">
        <div class="input-wrapper w-7/12 relative">
          <input
            @focus="handleFocusInput"
            @input="$emit('input', $event)"
            v-model="categoryName"
            class="form-input pl-3 w-full text-gray-500 text-base mt-1 leading-7 rounded border border-gray-300 focus:outline-gray-300 py-2"
            name="dropdown"
            type="text"
            :disabled="selectedOption"
          />
          <div v-if="selectedOption || transactionCategory" class="absolute bottom-3 left-2">
            <BasePill :text="selectedOption?.name || transactionCategory?.name" :color="selectedOption?.color || transactionCategory?.color" />
          </div>

          <div class="icons absolute bottom-3 right-3">
            <div
              v-if="selectedOption || transactionCategory"
              @click="clearInput"
              @keydown="clearInput"
              class="clear-selection fill-gray-300 cursor-pointer"
            >
              <v-icon name="times" scale="1.2" />
            </div>
            <div v-if="!options.length && !selectedOption && !transactionCategory" class="clear-selection fill-gray-300 cursor-pointer translate-y-1">
              <input v-model="selectedColor" class="cursor-pointer" type="color" />
            </div>
          </div>

          <div v-if="options.length && showOptions" class="relative">
            <div class="options cursor-pointer bg-white block absolute top: 0 left-0 right-0 max-h-96 overflow-y-auto">
              <div v-for="option in options" :key="option.id" @click="handleSelected(option)" @keydown="handleSelected(option)" class="p-2">
                <BasePill :text="option.name" :color="option.color" />
              </div>
            </div>
          </div>
        </div>
        <div class="btn-wrapper w-5/12">
          <button v-if="!options.length && !transactionCategory" @click="createCategory" class="bg-blue-500 p-3 ml-5 block rounded-md text-white">
            Create category
          </button>
        </div>
      </div>
    </label>
  </div>
</template>

<script>
import 'vue-awesome/icons/times';
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
      default: () => [],
    },

    category: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      showOptions: false,
      selectedOption: null,
      selectedColor: '#F1F5F9',
      categoryName: '',
      transactionCategory: null,
    };
  },

  watch: {
    category: {
      handler(value) {
        this.transactionCategory = value;
      },
      immediate: true,
    },
  },

  methods: {
    handleSelected(option) {
      this.$emit('selected', option);
      this.selectedOption = option;
      this.showOptions = false;
    },

    handleFocusInput() {
      this.selectedOption = null;
      this.showOptions = true;
    },

    clearInput() {
      this.transactionCategory = null;
      this.selectedOption = null;
    },

    createCategory() {
      const name = this.categoryName;
      const color = this.selectedColor.replace('#', '') || 'f1f5f9';

      if (name && color) {
        this.$emit('create', { name, color });
        this.categoryName = '';
        this.selectedColor = '#F1F5F9';
        this.transactionCategory = null;
        this.clearInput();
      }
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
