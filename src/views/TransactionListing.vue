<template>
  <div>
    Transaction Listing
    <TransactionSearch />

    <VirtualList
      class="virtual-list"
      :data-key="'id'"
      :data-sources="transactions"
      :data-component="itemRowComponent"
      :estimate-size="70"
      @tobottom="fetchTransactions"
    >
      <!-- <div slot="footer" class="loading-spinner">Loading ...</div> -->
    </VirtualList>

    <!-- <div v-for="transaction in transactions" :key="transaction.id">{{ transaction.id }} -- {{ transaction.created_at }}</div> -->
  </div>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list';
import ItemRow from '@/components/Atoms/ItemRow.vue';
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
          variables: {
            cursor: this.cursor ? new Date(this.cursor) : null,
          },
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

<style lang="scss" scoped>
.virtual-list {
  width: 100%;
  height: 500px;
  border: 2px solid;
  border-radius: 3px;
  overflow-y: auto;
  border-color: dimgray;
}
</style>
