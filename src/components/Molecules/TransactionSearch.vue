<template>
  <div class="transaction-search flex gap-8 columns-12 p-6 bg-white">
    <div class="w-6/12">
      <InputForm v-model="searchText" />
    </div>

    <div class="w-2/12">
      <SelectForm v-model="selectedBankOption" />
    </div>

    <div class="w-2/12">
      <SelectForm v-model="selectedAccountOption" />
    </div>

    <div class="w-2/12">
      <SelectDateRange v-model="dateRange" />
    </div>
  </div>
</template>

<script>
import InputForm from '@/components/Atoms/InputForm.vue';
import SelectForm from '@/components/Atoms/SelectForm.vue';
import SelectDateRange from '@/components/Atoms/SelectDateRange.vue';

export default {
  components: {
    InputForm,
    SelectForm,
    SelectDateRange,
  },

  data() {
    return {
      searchText: '',
      selectedBankOption: null,
      selectedAccountOption: null,
      dateRange: null,
    };
  },
};
</script>
