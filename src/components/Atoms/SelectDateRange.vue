<template>
  <div class="select-date-range relative">
    <v-date-picker @input="handleInput" v-model="range" :max-date="new Date()" is-range>
      <template v-slot="{ inputValue, inputEvents }">
        <span class="font-medium text-sm text-gray-400">{{ label }}</span>
        <div class="flex justify-center items-center">
          <input :value="inputValue.start" v-on="inputEvents.start" :class="inputStyle" readonly />

          <v-icon name="arrow-right" class="fill-gray-300 pointer-events-none mx-3" scale="2" />

          <input :value="inputValue.end" v-on="inputEvents.end" :class="inputStyle" readonly />
        </div>
      </template>
    </v-date-picker>
  </div>
</template>

<script>
import 'vue-awesome/icons/calendar';
import 'vue-awesome/icons/arrow-right';

export default {
  props: {
    label: {
      type: String,
      default: 'Select Interval',
    },
  },

  data() {
    return {
      showCalendar: false,
      range: null,
      inputStyle: `
        form-input
        cursor-pointer
        text-gray-500
        text-base
        w-full
        mt-1
        leading-7
        rounded
        border
        border-gray-300
        focus:outline-gray-300
        py-2
        pl-1`,
    };
  },

  methods: {
    handleInput() {
      this.$emit('input', this.range);
    },

    handleCalendarVisibility() {
      this.showCalendar = !this.showCalendar;
    },
  },
};
</script>
