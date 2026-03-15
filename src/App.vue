<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";
import * as htmlToImage from "html-to-image";
import downloadjs from "downloadjs";
import MaterialSymbolsDownload from "~icons/material-symbols/download";

import { useSettingsStore } from "@/stores/settings";
import ThePeriodicTable from "@/components/ThePeriodicTable.vue";

const settingsStore = useSettingsStore();

const enableCustomFont = ref<boolean>(false);
const customFont = ref<string>("Consolas, monospace");

const scaleUpMul = ref<number>(300);
const scaleUpMulCSS = computed(() => `${scaleUpMul.value}%`);

const saveContainerRef = useTemplateRef<HTMLElement>("saveContainer");
const isSaving = ref<boolean>(false);

function save() {
  if (saveContainerRef.value) {
    isSaving.value = true;

    setTimeout(() => {
      if (saveContainerRef.value) {
        console.log(saveContainerRef.value.classList);
        htmlToImage
          .toPng(saveContainerRef.value)
          .then((dataUrl) => {
            downloadjs(dataUrl, "SeryiBaran__periodic-vue");
          })
          .catch((err: Error) => {
            console.error("Произошла ошибка! Убэйса апстэнку!", err);
          })
          .finally(() => {
            isSaving.value = false;
          });
      }
    }, 200);
  }
}
</script>

<template>
  <main
    :class="[settingsStore.compactMode && 'compactMode']"
    :style="
      enableCustomFont && customFont.length > 0 && `font-family: ${customFont};`
    "
  >
    <div>
      <h1>Периодическая система химических элементов Д. И. Менделеева</h1>
      <p>Шрифт по умолчанию - <code>GOST Type BU</code>.</p>
      <p>Приведены следующие параметры:</p>
      <ul class="listStyles">
        <li>Электронные слои</li>
        <li>Номер</li>
        <li>Символ</li>
        <li>Относительная атомная масса</li>
        <li>Электронная конфигурация</li>
        <li>
          Название:
          <ul class="listStyles">
            <li>На русском</li>
            <li>На английском</li>
            <li>На латыни</li>
          </ul>
        </li>
      </ul>
      <ul class="settings">
        <li>
          <label>
            <input type="checkbox" v-model="enableCustomFont" />
            Кастомный шрифт:
          </label>
          <input type="text" v-model="customFont" />
        </li>
        <li>
          <label>
            Увеличение при сохранении ({{ scaleUpMulCSS }}):
            <input
              type="range"
              v-model="scaleUpMul"
              :min="50"
              :max="1000"
              :step="50"
            />
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" v-model="settingsStore.compactMode" />
            Компактный режим
          </label>
        </li>
      </ul>
      <p class="buttons">
        <button
          id="download_tables_btn"
          class="pure-button btnWithIcon"
          @click="save"
        >
          <MaterialSymbolsDownload />
          <template v-if="!isSaving"
            >Скачать таблицу в .PNG
            <code style="color: red">(BETA)</code></template
          >
          <template v-else>Подождите...</template>
        </button>
      </p>
    </div>
    <div class="saveContainer" ref="saveContainer">
      <ThePeriodicTable
        :class="[isSaving && 'scaleUp']"
        ref="tablesContainer"
      ></ThePeriodicTable>
    </div>
  </main>
</template>

<style scoped>
.scaleUp {
  font-size: v-bind(scaleUpMulCSS);
}

.buttons,
.settings {
  margin: 1em 0;
}

.settings li,
.settings li label {
  display: flex;
  align-items: center;
  gap: 0.4em;
}
</style>
