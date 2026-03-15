import { ref, computed } from "vue";
import { defineStore } from "pinia";

interface Settings {
  compactMode: boolean;
  additionalPeriodLength: number;
}

export const defaults: Settings = {
  compactMode: false,
  additionalPeriodLength: 10,
};

export const useSettingsStore = defineStore("settings", () => {
  const compactMode = ref(defaults.compactMode);
  const additionalPeriodLength = ref(defaults.additionalPeriodLength);

  return { compactMode, additionalPeriodLength };
});
