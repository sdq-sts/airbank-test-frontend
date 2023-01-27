<template>
  <main class="p-8 bg-white">
    <h1 class="text-xl uppercase mb-10">Transaction Details</h1>

    <div class="mb-8 flex gap-8 columns-12 w-full">
      <div class="bg-slate-50 w-6/12 columns-12 flex p-8">
        <div class="w-6/12 text-gray-500">
          <p class="text-xs text-gray-400">Reference</p>
          <p class="w-full">{{ transactionDetails.reference || 'No reference provided' }}</p>
        </div>
        <div class="w-6/12 text-gray-500 text-right">
          <p class="text-xs text-gray-400">Amount</p>
          <p class="inline">
            <span>{{ transactionDetails.amount }}</span>
            <span class="ml-2">{{ transactionDetails.currency }}</span>
          </p>
        </div>
      </div>

      <div v-if="transactionDetails.account" class="bg-slate-50 w-6/12 columns-12 flex p-8">
        <div class="w-8/12 text-gray-500">
          <p class="text-xs text-gray-400">Account name</p>
          <p class="w-full">{{ transactionDetails.account.name || 'No name provided' }}</p>
        </div>
        <div class="w-4/12 text-gray-500">
          <p class="text-xs text-gray-400">Bank</p>
          <p class="inline">
            <span>{{ transactionDetails.account.bank }}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="bg-slate-50 columns-12 flex p-8">
      <BaseDropdown @selected="handleSelectedCategory" @input="fetchCategories" />
    </div>

    <div class="text-xs text-gray-400 text-right mt-4">
      <span>Created at {{ new Date(transactionDetails.created_at).toLocaleDateString('en-GB') }}</span>
    </div>

    <!-- <pre>
      {{ transactionDetails }}
    </pre>

    <pre>
      {{ categories }}
    </pre> -->
  </main>
</template>

<script>
import { FETCH_TRANSACTION_DETAILS_QUERY } from '@/graphql/queries/transactionDetails.ts';
import { FETCH_CATEGORIES_QUERY } from '@/graphql/queries/categories.ts';
import BaseDropdown from '@/components/Molecules/CategoryDropdown.vue';

export default {
  components: {
    BaseDropdown,
  },

  data() {
    return {
      transactionDetails: {},
      categories: [],
    };
  },

  methods: {
    async fetchTransactionDetails(id) {
      const transactionDetailsResponse = await this.$apollo.query({
        query: FETCH_TRANSACTION_DETAILS_QUERY,
        variables: { transactionId: id },
      });

      this.transactionDetails = transactionDetailsResponse.data.transaction;
    },

    handleSelectedCategory(event) {
      console.log(event);
    },

    async fetchCategories(event) {
      console.log(event);
      const categoriesResponse = await this.$apollo.query({
        query: FETCH_CATEGORIES_QUERY,
        variables: {},
      });
      this.categories = categoriesResponse.data.categories;
      console.log(categoriesResponse);
    },
  },

  mounted() {
    const { id } = this.$route.params;
    this.fetchTransactionDetails(id);
    this.fetchCategories();
  },
};
</script>
