<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isEmpty?: boolean;
  }>(),
  {
    isEmpty: false,
  },
);
</script>

<template>
  <td class="cell" :class="[props.isEmpty && 'cell__empty']">
    <slot v-if="!props.isEmpty"></slot>
  </td>
</template>

<style scoped>
.cell {
  position: relative;
  max-width: 12em;
  text-align: left;
  line-height: 0.8;
  vertical-align: top;
  &:not(.compactMode *) {
    padding: 0.2em 0.1em 0.1em 0.1em;
  }
}
</style>
