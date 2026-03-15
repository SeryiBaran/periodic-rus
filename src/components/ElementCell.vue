<script setup lang="ts">
import { computed } from "vue";
import MaterialSymbolsAsterisk from "~icons/material-symbols/asterisk";

import {
  additionalElementsData,
  bElements,
  periodicTableData,
  specialPositionsIDs,
  unsureWeights,
  type DataElement,
} from "@/data/periodicTableData";
import Cell from "./Cell.vue";
import { useSettingsStore } from "@/stores/settings";
import { getElementStyle } from "@/shared/utils";

const props = defineProps<{
  elementNumber: number;
}>();

const settingsStore = useSettingsStore();

const element = computed(
  () => periodicTableData.elements[props.elementNumber - 1] as DataElement,
);

const unsureWeight = computed(() =>
  unsureWeights.includes(element.value.number),
);

const atomWeightLabel = computed(
  () =>
    `${unsureWeight.value ? "[" : ""}${settingsStore.compactMode ? Math.floor(element.value.atomic_mass * 1000) / 1000 : element.value.atomic_mass}${unsureWeight.value ? "]" : ""}`,
);

const marksNumber = computed(
  () =>
    [specialPositionsIDs.lanthanides, specialPositionsIDs.actinides].findIndex(
      (num) => num === element.value.number,
    ) + 1,
);

const configurationHTML = computed(() =>
  element.value.electron_configuration_semantic.replaceAll(
    /([a-z])(\d+)/g,
    "$1<sup>$2</sup>",
  ),
);

const additionalElementData = computed(
  () => additionalElementsData[element.value.number - 1],
);
</script>

<template>
  <Cell
    :class="[bElements.includes(element.number) && 'cell__bElement']"
    :style="getElementStyle(element)"
  >
    <div class="cellContent">
      <div class="cellElectrons" v-if="!settingsStore.compactMode">
        <ul>
          <li v-for="shell in element.shells.slice().reverse()">
            {{ shell }}
          </li>
        </ul>
      </div>
      <div class="cellOther">
        <div class="cellData">
          <div class="cellDataBlocks">
            <span class="cellDataFirstBlock">
              <a :href="element.source" class="cellDataSymbolBlock">
                <span class="cellNumber">{{ element.number }}</span>
                <span class="cellSymbol">{{ element.symbol }}</span>
              </a>
              <span class="cellWeight">{{ atomWeightLabel }}</span>
            </span>
            <div class="cellDataSecondBlock">
              <span class="specialElementMark" v-if="marksNumber">
                <MaterialSymbolsAsterisk
                  v-for="markIndex in marksNumber"
                  :key="markIndex"
                ></MaterialSymbolsAsterisk>
              </span>
            </div>
          </div>
          <div
            class="cellElectronConfig"
            v-if="!settingsStore.compactMode"
            v-html="configurationHTML"
          ></div>
        </div>
        <div class="cellNames" v-if="additionalElementData">
          <ul>
            <li>{{ additionalElementData.ru }}</li>
            <li v-if="!settingsStore.compactMode">{{ element.name }}</li>
            <li
              v-if="
                additionalElementData.lat !== element.name ||
                settingsStore.compactMode
              "
            >
              {{ additionalElementData.lat }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Cell>
</template>

<style scoped>
.cellContent {
  position: relative;
  display: flex;
  align-items: stretch;

  .cell__bElement & {
    flex-direction: row-reverse;
  }
}

.cellElectrons {
  padding: 0.1em;
  font-size: 0.8em;
  line-height: 0.9;
  text-align: right;

  .cell__bElement & {
    text-align: left;
  }
}

.cellOther {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cellData {
  flex-grow: 1;
}

.cellDataBlocks {
  display: flex;
  justify-content: space-between;
}

.cell__bElement .cellDataBlocks {
  flex-direction: row-reverse;
}

.cellDataFirstBlock {
  &:not(.compactMode *) {
    margin: 0 0.3em;
  }
  .compactMode & {
    display: flex;
    align-items: baseline;
    gap: 0.2em;
    margin-bottom: 0.2em;
  }
}

.cell__bElement .cellDataFirstBlock {
  flex-direction: row-reverse;
  text-align: right;
}

.cellDataSymbolBlock {
  display: flex;
  gap: 0.1em;
  font-size: 1.1em;
  text-decoration: underline;

  &:not(.compactMode *) {
    padding-bottom: 0.2em;
  }
}

.cell__bElement .cellDataSymbolBlock {
  justify-content: right;
}

.cellSymbol {
  font-weight: 700;
}

.cellWeight {
  &:not(.compactMode *) {
    font-size: 0.9em;
  }
}

.cellElectronConfig {
  font-size: 0.8em;
  padding-top: 0.2em;
  line-height: 1.5;
}

.cellNames li {
  width: max-content;
}

sup {
  font-size: 1em;
}

a {
  color: inherit;
}
</style>
