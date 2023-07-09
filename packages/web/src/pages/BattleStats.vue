<template>
  <v-chart class="chart" :option="option" />
</template>

<script setup lang="ts">
import { BarChart } from "echarts/charts";
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  SingleAxisComponent,
  TooltipComponent } from "echarts/components";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { provide, ref, watch } from "vue";
import VChart, { THEME_KEY } from "vue-echarts";

const props = defineProps<{
  battleStats: Record<string, { damage: number; damaged: number, heal: number, roundCount: number }>;
}>();

use([
  GridComponent,
  SingleAxisComponent,
  CanvasRenderer,
  BarChart,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
]);

provide(THEME_KEY, "light");

const option = ref({
  legend: {},
  tooltip: {},
  dataset: {
    source:[["角色", "造成伤害", "承受伤害", "治疗量", "行动次数"]] as Array<Array<string | number>>,
  },
  xAxis: { type: "category" },
  yAxis: {},
  series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }, { type: "bar" }],
});

const throottle = (fn: () => void, delay: number, immediate = false) => {
  let timer: number | null = null;

  return () => {
    if (timer) {
      return;
    }

    immediate && fn();

    timer = setTimeout(() => {
      !immediate && fn();
      timer = null;
    }, delay);
  };
};

const updateOption = throottle(() => {
  const data = Object.entries(props.battleStats).map(([name, stats]) => {
    return [name, stats.damage, stats.damaged, stats.heal, stats.roundCount];
  });

  option.value.dataset.source = [
    ["角色", "造成伤害", "承受伤害", "治疗量", "行动次数"],
    ...data,
  ];
}, 500, true);

watch(props, () => {
  updateOption();
}, { deep:true });

</script>

<style scoped>
.chart {
  width: 360px;
  height: 240px;
}
</style>
