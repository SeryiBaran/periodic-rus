<script setup lang="ts">
import MaterialSymbolsAsterisk from "~icons/material-symbols/asterisk";

import { useSettingsStore } from "@/stores/settings";
import {
  additionalElementsData,
  bElements,
  groups,
  periodicTableData,
  positions,
  specialPositionsIDs,
  unsureWeights,
  type DataElement,
} from "@/data/periodicTableData";
import Period from "./Period.vue";
import Row from "./Row.vue";
import { computed } from "vue";
import { chunkArr } from "@/shared/utils";

const settingsStore = useSettingsStore();

const additionalPeriodsData = [
  { data: positions.lanthanides, name: "Лантаноиды" },
  { data: positions.actinides, name: "Актиноиды" },
];

const additionalPeriods = computed(() =>
  additionalPeriodsData.map((period) => ({
    ...period,
    data: chunkArr(
      period.data,
      settingsStore.compactMode
        ? settingsStore.additionalPeriodLength
        : period.data.length,
    ),
  })),
);
</script>

<template>
  <div class="tablesContainer">
    <div class="mainTableContainer">
      <table id="table">
        <thead id="thead">
          <tr>
            <th class="vertical-lr">Пер</th>
            <th class="vertical-lr">Ряд</th>
            <th
              v-for="(group, groupIndex) in groups"
              :key="group"
              v-bind="{ colspan: groupIndex + 1 === 8 ? 3 : undefined }"
            >
              <span class="groupTitle">
                <span class="groupTitleL">А</span>
                {{ group }}
                <span class="groupTitleR">Б</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody id="tbody">
          <Period
            v-for="(period, periodIndex) in positions.main"
            :key="periodIndex"
            :period
            :periodIndex
          ></Period>
        </tbody>
      </table>
      <ul class="testBGList noListStyles vertical-lr">
        <li><span class="s-bg"></span>s-элементы</li>
        <li><span class="p-bg"></span>p-элементы</li>
        <li><span class="d-bg"></span>d-элементы</li>
        <li><span class="f-bg"></span>f-элементы</li>
      </ul>
    </div>
    <table id="otherTable">
      <tbody id="otherTbody">
        <template
          v-for="(period, periodIndex) in additionalPeriods"
          :key="periodIndex"
        >
          <tr v-for="(chunk, chunkIndex) in period.data" :key="chunkIndex">
            <td
              class="vertical-lr otherTableTitle"
              v-if="chunkIndex === 0"
              :rowspan="period.data.length"
            >
              <div class="specialElementMark">
                <MaterialSymbolsAsterisk
                  v-for="markIndex in periodIndex + 1"
                  :key="markIndex"
                ></MaterialSymbolsAsterisk>
              </div>
              {{ period.name }}
            </td>
            <Row :row="chunk"></Row>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.tablesContainer {
  background-color: #fff;
  color: #000;
}

table {
  table-layout: fixed;
  border-collapse: collapse;
}

th {
  font-weight: inherit;
}

.mainTableContainer {
  display: inline-flex;
  gap: 0.2em;
}

.testBGList {
  display: flex;
  gap: 2em;
  font-size: 1.2em;
  writing-mode: vertical-lr;

  li {
    display: flex;
    align-items: center;
    gap: 0.4em;

    span {
      display: inline-block;
      height: 5em;
      width: 1.5em;
      border: 0.1em black solid;
    }
  }

  .compactMode & {
    display: none;
  }
}

#otherTable {
  margin-top: 0.5em;
}

.otherTableTitle {
  text-align: center;
  font-size: 1.1em;
  &:not(.compactMode *) {
    padding: 0.1em;
  }
}

.groupTitle {
  display: flex;
  justify-content: space-evenly;
}
</style>
