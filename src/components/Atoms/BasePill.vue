<template functional>
  <p v-if="props.text" class="font-medium group inline text-xs text-[#000] rounded px-4 py-2" :style="{ background: `#${props.color || 'f1f5f9'}` }">
    {{ props.text }}
  </p>
</template>
