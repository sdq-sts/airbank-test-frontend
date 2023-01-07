<template>
  <div>
    Transaction Listing
    <TransactionSearch />
  </div>
</template>

<script>
import TransactionSearch from '@/components/Molecules/TransactionSearch.vue';

export default {
  components: {
    TransactionSearch,
  },
};
</script>
