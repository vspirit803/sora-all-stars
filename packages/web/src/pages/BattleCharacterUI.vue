<script setup lang="ts">
import { type Battle, BattleEventType } from "@sora-all-stars/core";
import { ref, watchEffect } from "vue";

import FallbackImage from "../components/FallbackImage.vue";
import { ACTION_DELAY } from "../constants";

export interface IBattleUIObject {
  id: string;
  uuid: string;
  name: string;
  hp: number;
  currHP: number;
}

const props = defineProps<{
  battle: Battle;
  // team: number;
  character: IBattleUIObject;
}>();

const numberContainer = ref<HTMLElement>();
const characterContainer = ref<HTMLElement>();

const isActive = ref(false);

watchEffect(() => {
  isActive.value = false;

  props.battle.listen(BattleEventType.DAMAGED, (data) => {
    if (data.target.uuid === props.character.uuid) {
      const dmgNumber = document.createElement("div");
      dmgNumber.classList.add("battle-character__number", "battle-character__number-damage");
      dmgNumber.innerText = `-${data.realDamage}`;
      numberContainer.value?.appendChild(dmgNumber);

      dmgNumber.animate(
        [
          {
            transform: "translateY(0px)",
            opacity: 1,
          },
          {
            transform: "translateY(-50px)",
            opacity: 0,
          },
        ],
        {
          duration: 1000,
          easing: "ease-in-out",
        }
      ).addEventListener("finish", () => {
        dmgNumber.remove();
      });

      characterContainer.value?.animate(
        [
          {
          },
          {
            outlineColor: "rgba(255, 0, 0, 0.5)",
          },
          {
          },
        ],
        {
          duration: 300,
          easing: "ease-in-out",
        }
      );
    }
  });

  props.battle.listen(BattleEventType.HEALED, (data) => {
    if (data.target.uuid === props.character.uuid) {
      const healNumber = document.createElement("div");
      healNumber.classList.add("battle-character__number", "battle-character__number-heal");
      healNumber.innerText = `+${data.realHealValue}`;
      numberContainer.value?.appendChild(healNumber);

      healNumber.animate(
        [
          {
            transform: "translateY(0px)",
            opacity: 1,
          },
          {
            transform: "translateY(-50px)",
            opacity: 0,
          },
        ],
        {
          duration: 1000,
          easing: "ease-in-out",
        }
      ).addEventListener("finish", () => {
        healNumber.remove();
      });

      characterContainer.value?.animate(
        [
          {
          },
          {
            outlineColor: "rgba(0, 255, 0, 0.5)",
          },
          {
          },
        ],
        {
          duration: 300,
          easing: "ease-in-out",
        }
      );
    }
  });

  props.battle.listen(BattleEventType.ACTION_START, (data) => {
    if (data.target.uuid === props.character.uuid) {
      const currPositon = characterContainer.value?.getBoundingClientRect();
      const targetPosition = characterContainer.value?.parentElement!.parentElement!.getBoundingClientRect();

      // const x = targetPosition!.left + targetPosition!.width / 2 - currPositon!.left - currPositon!.width / 2;
      const x = 0;
      const y = (targetPosition!.top + targetPosition!.height / 2 - currPositon!.top - currPositon!.height / 2) / 4;

      isActive.value = true;

      characterContainer.value?.animate(
        [
          {
            transform: "scale(1)",
          },
          {
            transform: `scale(1) translate(${x}px, ${y}px)`,
          },
          {
            transform: "scale(1)",
          },
        ],
        {
          duration: ACTION_DELAY * 0.6,
          easing: "ease-in-out",
        }
      );

      setTimeout(() => {
        isActive.value = false;
      }, ACTION_DELAY);
    }
  });
});

</script>
<template>
  <div
    ref="characterContainer"
    class="battle-character"
    :class="{
      'battle-character--dead': character.currHP <= 0,
      'battle-character--active': isActive,
    }"
  >
    <div ref="numberContainer" />
    <div class="battle-character__name">
      {{ character.name }}
    </div>
    <v-progress-linear
      class="battle-character__hp-bar"
      color="light-green-darken-4"
      :model-value="character.currHP / character.hp * 100"
      :height="20"
    >
      {{ character.currHP }}
    </v-progress-linear>
    <FallbackImage
      class="battle-character__image"
      :src="`/images/character/avatar/${character.id}.png`"
      alt="/vite.svg"
    />
  </div>
</template>

<style lang="postcss" scoped>
.battle-character {
  position: relative;
  border-radius: 8px;
  outline: 2px solid #aaa;

  &--active {
    /* outline-color: #f44336; */
  }

  &--dead {
    filter: grayscale(100%);
  }

  &__name {
    font-size: 16px;
    line-height: 32px;
    position: relative;
    z-index: 1;
    visibility: hidden;
  }

  &__hp-bar {
    position: absolute;
    bottom: 0px;
    top: unset !important;
    border-radius: 8px;
    z-index: 1;

    :deep(.v-progress-linear__background) {
      opacity: 0.5;
      background-color: grey !important;
    }
  }

  &__image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 8px;
    overflow: hidden;
    object-fit: cover;
    display: block;
    z-index: 0;
  }

  :deep(&__number) {
    position: absolute;
    top: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 32px;
    font-weight: bold;
    line-height: 32px;
    z-index: 2;
    pointer-events: none;
    letter-spacing: 3px;

    &-heal {
      color: green;
    }

    &-damage {
      color: red;
    }
  }
}
</style>
