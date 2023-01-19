<template>
  <div class="p-8 bg-white">
    Transaction Listing
    <TransactionSearch />

    <table class="w-full">
      <th class="flex columns-12 py-4 text-gray-400 text-left font-medium border-y text-base bold border-top- bg-white">
        <div class="w-6/12">Reference</div>
        <div class="w-3/12">Category</div>
        <div class="w-2/12">Date</div>
        <div class="w-1/12 text-right pr-4">Amount</div>
      </th>
      <VirtualList
        class="virtual-list h-[800px] relative w-full bg-white overflow-x-auto"
        :data-key="'id'"
        :data-sources="transactions"
        :data-component="itemRowComponent"
        :estimate-size="70"
        wrap-class="wrapper"
        @tobottom="fetchTransactions"
      />
    </table>
  </div>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list';
import ItemRow from '@/components/Molecules/ItemRow.vue';
import { FETCH_TRANSACTIONS_QUERY } from '@/graphql/queries/transactions.ts';
import TransactionSearch from '@/components/Molecules/TransactionSearch.vue';

export default {
  components: {
    TransactionSearch,
    VirtualList,
  },

  data() {
    return {
      itemRowComponent: ItemRow,
      transactions: [],
      transactionsQueryCursor: null,
      isLoadingTransactions: false,
    };
  },

  methods: {
    async fetchTransactions() {
      this.isLoadingTransactions = true;

      try {
        const transactionsResponse = await this.$apollo.query({
          query: FETCH_TRANSACTIONS_QUERY,
          variables: { cursor: this.cursor ? new Date(this.cursor) : null },
        });
        const transactionsData = transactionsResponse.data.transactions;

        const transactionsDataCursor = transactionsData[transactionsData.length - 1].created_at;
        const isLastCursor = transactionsDataCursor === this.cursor;

        this.transactions = isLastCursor ? [...this.transactions] : [...this.transactions, ...transactionsData];
        this.cursor = transactionsDataCursor;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoadingTransactions = true;
      }
    },
  },

  mounted() {
    this.fetchTransactions();
  },
};
</script>

<style lang="scss">
.virtual-list {
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
