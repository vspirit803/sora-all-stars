<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiHomeCircle } from "@mdi/js";
import { Game, ItemType, MaterialItem } from "@sora-all-stars/core";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const game = Game.instance;
const items = game.items;
const equipments = items.filter((item) => item.type === ItemType.Equipment);
const materials = items.filter((item) => item.type === ItemType.Material);

const selTab = ref(ItemType.Equipment);
const router = useRouter();

const selTabItems = computed(() => {
  switch (selTab.value) {
  case ItemType.Equipment:
    return equipments;
  case ItemType.Material:
    return materials;
  default:
    return [];
  }
});
</script>
<template>
  <div class="page-backpack">
    <div class="backpack__toolbar">
      <SvgIcon
        type="mdi"
        :path="mdiHomeCircle"
        :size="36"
        class="backpack__toolbar--icon"
        @click="() => router.push('/')"
      />
    </div>
    <div class="backpack__tabs">
      <div
        class="tab__item"
        :class="{ 'tab__item--selected': selTab === ItemType.Equipment }"
        @click="selTab = ItemType.Equipment"
      >
        装备
      </div>
      <div
        class="tab__item"
        :class="{ 'tab__item--selected': selTab === ItemType.Material }"
        @click="selTab = ItemType.Material"
      >
        材料
      </div>
    </div>
    <div class="backpack__body">
      <div v-for="i of 40" :key="i - 1 < selTabItems.length ? selTabItems[i - 1].id : undefined" class="backpack__item">
        <template v-if="i - 1 < selTabItems.length">
          {{ selTabItems[i - 1].name }} {{ selTabItems[i - 1] instanceof MaterialItem ? selTabItems[i - 1].count : "" }}
        </template>
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.page-backpack {
  .backpack {
    &__toolbar {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      align-content: center;
      padding: 8px;
      gap: 8px;

      &--icon {
        cursor: pointer;
      }
    }

    &__body {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      align-content: center;
    }

    &__tabs {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      align-content: center;

      .tab__item {
        width: 100px;
        border-bottom: 2px solid transparent;

        &--selected {
          border-bottom-color: cyan;
        }
      }
    }

    &__item {
      width: 100px;
      height: 100px;
      border: 1px solid #000;
      margin: 10px;
    }
  }
}
</style>
