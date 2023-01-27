<template>
  <tr
    @click="$router.push(`/transactions/${source.id}`)"
    class="item-row flex columns-12 border-b cursor-pointer font-medium text-sm items-center text-gray-600"
  >
    <td v-if="source.reference" class="w-6/12 text-gray-500 font-medium">{{ source.reference }}</td>
    <td v-else class="w-6/12 text-gray-400 font-medium">No reference provided</td>
    <td class="w-4/12">
      <BasePill :text="source.category?.name" :color="source.category?.color" />
    </td>
    <td class="w-1/12">{{ new Date(source.created_at).toLocaleDateString('en-GB') }}</td>
    <td class="w-1/12 text-right pr-4">
      {{ source.amount }} <span class="text-gray-400 font-medium">{{ source.currency }}</span>
    </td>
  </tr>
</template>

<script>
import BasePill from '@/components/Atoms/BasePill.vue';

export default {
  components: {
    BasePill,
  },

  props: {
    index: {
      type: Number,
    },
    source: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.item-row {
  height: 70px;
}
</style>
