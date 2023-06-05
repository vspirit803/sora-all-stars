<script setup lang="ts">
import { mdiBagPersonal, mdiHomeCircle } from "@mdi/js";
import { EquipmentItem, Game, ItemType, MaterialItem } from "@sora-all-stars/core";
import { ref } from "vue";
import { useRouter } from "vue-router";

import RarityItemUI from "../components/RarityItemUI.vue";
import MaterialItemUI from "./MaterialItemUI.vue";

const game = Game.instance;
const items = game.items;
const equipments = items.filter((item) => item instanceof EquipmentItem) as EquipmentItem[];
const materials = items.filter((item) => item instanceof MaterialItem) as MaterialItem[];

const selTab = ref(ItemType.Equipment);
const router = useRouter();
</script>
<template>
  <div class="page-backpack">
    <div class="backpack__toolbar">
      <v-chip
        variant="text"
      >
        <template #prepend>
          <v-icon
            color="white"
            :icon="mdiBagPersonal"
            :size="36"
          />
        </template>
        背包
      </v-chip>
      <v-tabs
        v-model="selTab"
        bg-color="transparent"
        class="backpack__tabs"
        align-tabs="center"
      >
        <v-tab :value="ItemType.Equipment">
          装备
        </v-tab>
        <v-tab :value="ItemType.Material">
          材料
        </v-tab>
      </v-tabs>
      <v-icon
        color="white"
        :icon="mdiHomeCircle"
        :size="36"
        class="backpack__toolbar--icon"
        @click="() => router.push('/')"
      />
    </div>
    <v-window v-model="selTab">
      <v-window-item :value="ItemType.Equipment" class="backpack__body">
        <div
          v-for="i of 40"
          :key="i - 1 < equipments.length ? equipments[i - 1].id : undefined"
          class="backpack__item"
        >
          <RarityItemUI
            v-if="i - 1 < equipments.length"
            :rarity="equipments[i - 1].rarity"
            :img-url="`/images/items/${equipments[i - 1].id}_${equipments[i - 1].name}.webp`"
            :text="equipments[i - 1].name"
            :selected="false"
          />
        </div>
      </v-window-item>
      <v-window-item :value="ItemType.Material" class="backpack__body">
        <div v-for="i of 40" :key="i - 1 < materials.length ? materials[i - 1].id : undefined" class="backpack__item">
          <template v-if="i - 1 < materials.length">
            <MaterialItemUI
              :item="materials[i - 1]"
            />
          </template>
        </div>
      </v-window-item>
    </v-window>
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
      flex-grow: 1;
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
      /* height: 100px; */
      /* border: 1px solid #000; */
      margin: 10px;
    }
  }
}
</style>
