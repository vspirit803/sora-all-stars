<script setup lang="ts">

import { type IBattleObject } from "@sora-all-stars/core";

import FallbackImage from "../components/FallbackImage.vue";

const props = defineProps<{
  progress: Array<[IBattleObject, number, number]>
}>();

</script>
<template>
  <div class="battle-progress-bar">
    <!-- <div v-for="each of progress" :key="each[0].uuid">
      <div class="battle-progress-bar__name">
        {{ each[0].name }}
      </div>
      <div class="battle-progress-bar__progress">
        <div class="battle-progress-bar__progress__bar" :style="{ width: each[1] * 100 + '%' }" />
      </div>
    </div> -->
    <div class="battle-progress-bar__container">
      <div
        v-for="each of progress.filter((each) => each[0].isAlive)"
        :key="each[0].uuid"
        class="battle-progress-bar__character"
        :style="{ transform: `translateY(-${each[1] * 480}px)`, zIndex: Math.round(each[1] * 100) }"
      >
        <FallbackImage
          class="battle-progress-bar__avatar"
          :src="`/images/character/avatar/${each[0].id}.webp`"
          alt="/vite.svg"
        />
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.battle-progress-bar {
 --avatar-size: 48px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: var(--avatar-size);

  &__name {
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 8px;
  }

  &__progress {
    width: 200px;
    height: 8px;
    background-color: #000;

    &__bar {
      height: 100%;
      background-color: #fff;
    }
  }

  &__container {
    position: relative;
    height: calc(var(--avatar-size) * 11);
    width: var(--avatar-size);
    overflow: hidden;
    background-color: rgba(128, 128, 128, 0.1);
    border-radius: calc(var(--avatar-size) / 2);
  }

  &__character {
    position: absolute;
    bottom: 0;
    left: 0;
    transition: transform 0.1s ease-in-out;
  }

  &__avatar {
    width: var(--avatar-size);
    height: var(--avatar-size);

    :deep(.v-img) {
      border-radius: calc(var(--avatar-size) / 2);
    }
  }
}
</style>
