<script setup lang="ts">
import { type MaterialItem } from "@sora-all-stars/core";

import RarityItemUI from "../components/RarityItemUI.vue";

const props = defineProps<{
  item: MaterialItem;
  selected?: boolean;
}>();
</script>
<template>
  <RarityItemUI
    class="material-item"
    :text="`${props.item.name} ${props.item.count}`"
    :rarity="props.item.rarity"
    :img-url="`/images/items/${props.item.id}_${props.item.name}.webp`"
    :selected="props.selected"
  />
</template>
