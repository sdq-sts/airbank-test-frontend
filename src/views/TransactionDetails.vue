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
      <BaseDropdown
        label="Category"
        @selected="handleSelectedCategory"
        @input="fetchCategories"
        @create="handleCreateCategory"
        :options="categories"
        :category="transactionCategory"
      />
    </div>

    <div class="text-xs text-gray-400 text-right mt-4">
      <span>Created at {{ new Date(transactionDetails.created_at).toLocaleDateString('en-GB') }}</span>
    </div>
  </main>
</template>

<script>
import { FETCH_TRANSACTION_DETAILS_QUERY } from '@/graphql/queries/transactionDetails.ts';
import { FETCH_CATEGORIES_QUERY } from '@/graphql/queries/categories.ts';
import BaseDropdown from '@/components/Molecules/CategoryDropdown.vue';
import { UPDATE_TRANSACTION_MUTATION } from '@/graphql/mutations/updateTransaction.ts';
import { CREATE_CATEGORY_MUTATION } from '@/graphql/mutations/createCategory.ts';
import { debounce } from '@/helpers';

export default {
  components: {
    BaseDropdown,
  },

  data() {
    return {
      transactionDetails: {},
      categories: [],
      transactionCategory: null,
    };
  },

  methods: {
    fetchCategories: debounce(async function fetchCategories(event) {
      const search = event.target.value;
      const categoriesResponse = await this.$apollo.query({
        query: FETCH_CATEGORIES_QUERY,
        variables: { search },
        fetchPolicy: 'network-only',
      });

      this.categories = categoriesResponse.data.categories;
    }, 500),

    async fetchTransactionDetails(id) {
      const transactionDetailsResponse = await this.$apollo.query({
        query: FETCH_TRANSACTION_DETAILS_QUERY,
        variables: { transactionId: id },
      });

      this.transactionDetails = transactionDetailsResponse.data.transaction;
      this.transactionCategory = this.transactionDetails?.category;
    },

    async handleSelectedCategory(event) {
      const { id } = this.transactionDetails;
      const data = { category_id: event.id };

      await this.$apollo.mutate({
        mutation: UPDATE_TRANSACTION_MUTATION,
        variables: { updateTransactionInput: { id, data } },
      });
    },

    async handleCreateCategory(event) {
      const { name, color } = event;

      await this.$apollo.mutate({
        mutation: CREATE_CATEGORY_MUTATION,
        variables: { createCategoryInput: { name, color } },
      });
    },
  },

  mounted() {
    const { id } = this.$route.params;
    this.fetchTransactionDetails(id);
  },
};
</script>
