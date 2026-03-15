<script setup lang="ts">
import { getGlobalRowIndex } from "@/shared/utils";
import Row from "./Row.vue";

const props = defineProps<{
  period: number[][];
  periodIndex: number;
}>();
</script>

<template>
  <tr v-for="(row, rowIndex) in props.period">
    <td
      v-if="rowIndex === 0"
      :rowspan="props.period.length"
      class="periodNumber"
    >
      {{ periodIndex + 1 }}
    </td>
    <td class="rowNumber">
      {{ getGlobalRowIndex(props.periodIndex, rowIndex) + 1 }}
    </td>
    <Row :row></Row>
  </tr>
</template>

<style scoped></style>
