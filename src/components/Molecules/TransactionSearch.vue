<template>
  <div class="flex gap-8 columns-12 py-6 bg-white">
    <div class="w-6/12">
      <InputForm v-model="searchText" @input="emitData" placeholder="Search by bank, account, reference, category, amount, currency...">
        <template #icon>
          <v-icon name="search" scale="1.2" />
        </template>
      </InputForm>
    </div>

    <div class="w-2/12">
      <SelectForm label="Bank" :options="bankOptions" v-model="selectedBankOption" @input="emitData" />
    </div>

    <div class="w-2/12">
      <SelectForm label="Account" :options="accountOptions" v-model="selectedAccountOption" @input="emitData" />
    </div>

    <div class="w-2/12">
      <SelectDateRange v-model="dateRange" @input="emitData" />
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/search';
import { debounce } from '@/helpers';
import InputForm from '@/components/Atoms/InputForm.vue';
import SelectForm from '@/components/Atoms/SelectForm.vue';
import SelectDateRange from '@/components/Atoms/SelectDateRange.vue';

export default {
  components: {
    InputForm,
    SelectForm,
    SelectDateRange,
  },

  props: {
    bankOptions: {
      type: Array,
      required: true,
    },
    accountOptions: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      searchText: '',
      selectedBankOption: null,
      selectedAccountOption: null,
      dateRange: null,
    };
  },

  methods: {
    emitData: debounce(function emitData() {
      const data = {
        search: this.searchText,
        bank: this.selectedBankOption,
        account: this.selectedAccountOption,
        range: this.dateRange,
      };

      this.$emit('formData', data);
    }, 500),
  },
};
</script>
