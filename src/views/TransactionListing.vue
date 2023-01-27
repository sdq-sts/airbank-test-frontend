<template>
  <main class="p-8 bg-white">
    <h1 class="text-xl uppercase">Transactions</h1>
    <TransactionSearch
      :bankOptions="bankOptions"
      :accountOptions="accountOptions"
      @formData="handleSearchData"
    />

    <table class="w-full">
      <th class="flex columns-12 py-4 text-gray-400 text-left font-medium border-y text-base bold border-top- bg-white">
        <td class="w-6/12">Reference</td>
        <td class="w-4/12">Category</td>
        <td class="w-1/12">Date</td>
        <td class="w-1/12 text-right pr-4">Amount</td>
      </th>
      <VirtualList
        class="virtual-list h-[800px] relative w-full bg-white overflow-x-auto"
        v-if="transactions.length"
        :data-key="'id'"
        :data-sources="transactions"
        :data-component="itemRowComponent"
        :estimate-size="70"
        wrap-class="wrapper"
        @tobottom="fetchTransactions"
      />
      <div class="text-center my-6" v-else>
        No data found for this search
      </div>
    </table>
  </main>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list';
import ItemRow from '@/components/Molecules/TransactionsRow.vue';
import { FETCH_TRANSACTIONS_QUERY } from '@/graphql/queries/transactions.ts';
import { FETCH_ACCOUNTS_QUERY } from '@/graphql/queries/accounts.ts';
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
      isNewSearch: false,
      search: '',
      bank: '',
      account: '',
      startDate: '',
      endDate: '',
      bankOptions: [],
      accountOptions: [],
    };
  },

  computed: {
    searchData() {
      const {
        search,
        bank,
        account,
        startDate,
        endDate,
      } = this;
      return {
        search,
        bank,
        account,
        startDate,
        endDate,
      };
    },
  },

  watch: {
    searchData: {
      handler: function searchDataWatcher() {
        this.isNewSearch = true;
      },
      deep: true,
    },
  },

  methods: {
    async fetchTransactions() {
      this.isLoadingTransactions = true;

      try {
        const transactionsResponse = await this.$apollo.query({
          query: FETCH_TRANSACTIONS_QUERY,
          variables: {
            ...(this.search && { search: this.search }),
            ...(this.bank && { bank: this.bank }),
            ...(this.account && { account: this.account }),
            ...(this.startDate && { startDate: this.startDate }),
            ...(this.endDate && { endDate: this.endDate }),
            cursor: this.cursor ? new Date(this.cursor) : null,
          },
        });

        if (this.isNewSearch) {
          this.transactions = [];
          this.cursor = null;
        }

        const transactionsData = transactionsResponse.data.transactions;

        if (transactionsData.length) {
          const transactionsDataCursor = transactionsData[transactionsData.length - 1].created_at;
          const isLastCursor = transactionsDataCursor === this.cursor;

          this.transactions = isLastCursor ? [...this.transactions] : [...this.transactions, ...transactionsData];
          this.cursor = transactionsDataCursor;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isNewSearch = false;
        this.isLoadingTransactions = false;
      }
    },

    handleSearchData(data) {
      this.search = data.search;
      this.bank = data.bank;
      this.account = data.account;
      this.startDate = data.range?.start;
      this.endDate = data.range?.end;

      this.fetchTransactions();
    },

    async fetchFormOptions() {
      try {
        const accountsResponse = await this.$apollo.query({ query: FETCH_ACCOUNTS_QUERY });
        const accountsData = accountsResponse.data.accounts;
        const banks = [...new Set(accountsData.map((account) => account.bank))];

        this.accountOptions = [
          { value: '', text: 'No filter applied' },
          ...accountsData.map((acc) => ({ value: acc.id, text: `${acc.name} - ${acc.bank}` })),
        ];
        this.bankOptions = [
          { value: '', text: 'No filter applied' },
          ...banks.map((bank) => ({ value: bank, text: bank })),
        ];
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.fetchFormOptions();
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
