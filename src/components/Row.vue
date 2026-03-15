<script setup lang="ts">
import {
  periodicTableData,
  specialPositionsIDs,
} from "@/data/periodicTableData";
import Cell from "./Cell.vue";
import ElementCell from "./ElementCell.vue";

const props = defineProps<{
  row: number[];
}>();
</script>

<template>
  <template v-for="elementNumber in props.row">
    <Cell
      v-if="elementNumber === specialPositionsIDs.none"
      :isEmpty="true"
    ></Cell>
    <ElementCell v-else :elementNumber></ElementCell>
  </template>
</template>

<style scoped></style>
