<script setup lang="ts">
import { type Rarity } from "@sora-all-stars/core";

import FallbackImage from "../components/FallbackImage.vue";

const props = withDefaults(defineProps<{
  imgUrl: string;
  text: string;
  rarity: Rarity;
  selected?: boolean;
}>(), {
  selected: false,
});
</script>
<template>
  <div
    class="rarity-item"
    :class="{
      'rarity-item--selected': props.selected,
      ['rarity-item--' + props.rarity]: true,
    }"
  >
    <FallbackImage
      draggable="false"
      class="rarity-item-image"
      :src="props.imgUrl"
    />
    <div class="rarity-item-inner" />
    <div class="rarity-item-text">
      {{ props.text }}
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.rarity-item {
  border-radius: 0 16px 0 0;
  position: relative;
  transition: all 0.1s ease-in-out;
  overflow: hidden;

  &--Normal {
    background: var(--color-rarity-normal);
  }

  &--Rare {
    background: var(--color-rarity-rare);
  }

  &--Legendary {
    background: var(--color-rarity-legendary);
  }

  &--Epic {
    background: var(--color-rarity-epic);
  }

  &--Mythic {
    background: var(--color-rarity-mythic);
  }

  &:hover {
    outline: 4px solid white;
  }

  &--selected {
    outline: 4px solid white;
    transform: scale(1.05);
  }

  &--lock {
    pointer-events: none;

    /* ^&-image */
    .character-list__item-image {
      filter: blur(4px);
    }

    &::after {
      content: "🔒";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 48px;
      font-weight: bold;
    }
  }

  &-image {
    aspect-ratio: 1 / 1;
    width: 100%;
    position: absolute;
    z-index: 1;
    object-fit: cover;
    display: block;
  }

  &-text {
    margin-top: 100%;
    background: rgb(35, 35, 35);
    color: white;
    margin-bottom: 2px;
  }

  &-inner {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: calc(100% - 16px);
    height: calc(100% - 34px);
    margin: 8px 8px 0;
    border-radius: 0 16px 0 0;
    border-bottom: none;
    border: 1px rgba(127, 127, 127, 0.75) solid;
  }
}
</style>
