<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiFlaskEmpty, mdiFlaskRoundBottomEmpty, mdiShield, mdiShoeFormal, mdiSword } from "@mdi/js";
import { type CharacterConfig, CharacterConfigManager, type CharacterPropertyConfig, Game, SkillConfigManager } from "@sora-all-stars/core";
import { type Ref, ref } from "vue";

import FallbackImage from "../components/FallbackImage.vue";

const game = Game.instance;

const charactersMap = game.characterMap;
const characterConfigMap = CharacterConfigManager.characterConfigMap;
const skillConfigMap = SkillConfigManager.skillConfigMap;
const characterConfigs: CharacterConfig[] = Array.from(characterConfigMap.values());

const selectedCharacterConfig: Ref<CharacterConfig> = ref(characterConfigs[0]);

function clickHandler(config: CharacterConfig) {
  selectedCharacterConfig.value = config;
}

interface IconConfig {
  path: string;
  color: string;
}

const ICON_MAP: Record<keyof CharacterPropertyConfig, IconConfig> = {
  ATK: { path: mdiSword, color: "red" },
  DEF: { path: mdiShield, color: "blue" },
  HP: { path: mdiFlaskRoundBottomEmpty, color: "red" },
  MP: { path: mdiFlaskEmpty, color: "blue" },
  SPD: { path: mdiShoeFormal, color: "green" },
};

</script>
<template>
  <div class="character-page">
    <div class="character-list">
      <div
        v-for="each of characterConfigs"
        :key="each.id"
        class="character-list__item"
        :class="{
          'character-list__item--selected': each.id === selectedCharacterConfig.id,
          ['character-list__item--' + each.rarity]: true,
        // 'character-list__item--lock': !charactersMap.has(each.id),
        }"
        @click="() => clickHandler(each)"
      >
        <FallbackImage
          draggable="false"
          class="character-list__item-image"
          :src="`/images/character/avatar/${each.id}.png`"
          alt="/vite.svg"
        />
        <!-- <div class="character-list__item-inner-line" /> -->
        <div class="character-list__item-name">
          {{ each.name }}
        </div>
      </div>
    </div>
    <div class="character-detail">
      <template v-if="selectedCharacterConfig">
        <div class="character-detail__name">
          {{ selectedCharacterConfig.name }} {{ selectedCharacterConfig.gender === "M" ? "♂" : "♀" }}
        </div>
        <div class="character-detail__image">
          <FallbackImage
            draggable="false"
            class="character-detail__image-tachie"
            :src="`/images/character/tachie/${selectedCharacterConfig.id}.webp`"
            alt="/vite.svg"
          />
        </div>
        <div class="character-detail__source">
          出自: {{ selectedCharacterConfig.source }}
        </div>
        <div class="character-detail__property">
          <template v-for="(propConfig, propName) in selectedCharacterConfig.properties" :key="propName">
            <div class="property-item__name">
              <SvgIcon
                class="property-item__name-icon"
                type="mdi"
                :path="ICON_MAP[propName].path"
                :style="{ color: ICON_MAP[propName].color }"
              />
              <span>{{ propName }}</span>
            </div>
            <div class="property-item__base">
              {{ propConfig.base }}
            </div>
            <div class="property-item__growth">
              <template v-if="propConfig.growth > 0">
                + {{ propConfig.growth }} / 级
              </template>
            </div>
          </template>
        </div>
        <div class="character-detail__skill">
          <div v-for="index of 4" :key="index" class="skill-item">
            {{ skillConfigMap.get(selectedCharacterConfig.defaultSkills[index - 1])?.name }}
          </div>
        </div>
        <div class="character-detail__description">
          {{ selectedCharacterConfig.description || "暂无描述" }}
        </div>
      </template>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.character {
  &-page {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 3fr 3fr;
  }

  &-list {
    overflow: auto;

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-content: start;
    padding: 16px;
    gap: 16px;

    &__item {
      border-radius: 0 16px 0 0;
      position: relative;
      transition: all 0.1s ease-in-out;
      overflow: hidden;

      &--Normal {
        .character-list__item-image {
          background-color: var(--color-rarity-normal);
        }
      }

      &--Rare {
        .character-list__item-image {
          background-color: var(--color-rarity-rare);
        }
      }

      &--Legendary {
        .character-list__item-image {

          background-color: var(--color-rarity-legendary);
        }
      }

      &--Epic {
        .character-list__item-image {
          background-color: var(--color-rarity-epic);
        }
      }

      &--Mythic {
        .character-list__item-image {
          background-color: var(--color-rarity-mythic);
        }
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
        /* height: 100%; */
        object-fit: cover;
        display: block;
      }

      &-inner-line {
        position: absolute;
        top: 0;
        left: 0;
        width: calc(100% - 16px);
        height: 100%;
        margin: 8px 8px 0;
        border-radius: 0 16px 0 0;
        outline: 2px rgba(127, 127, 127, 0.5) solid;
      }
    }
  }

  &-detail {
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);

    align-content: start;

    &__name {
      grid-column: 1 / 7;
      font-size: 24px;
      font-weight: bold;
      margin: 16px;
    }

    &__image {
      grid-column: 7 / 13;
      grid-row: 1 / 5;
      border-radius: 8px;

      aspect-ratio: 2 / 3;
      overflow: hidden;

      &-tachie {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }

    &__source {
      grid-column: 1 / 7;
      font-size: 16px;
      margin: 16px;
    }

    &__property {
      grid-column: 1 / 7;
      margin: 16px;

      display: grid;
      grid-template-columns: 2fr 1fr 2fr;
      gap: 12px;

      .property-item {
        &__name {
          font-weight: bold;
          display: flex;
          align-items: flex-start;

          &-icon {
            margin-right: 8px;
          }
        }

        &__base {}

        &__growth {}
      }
    }

    &__description {
      grid-column: 1 / 13;
      margin: 16px;
      background-color: rgba(255, 228, 196, 0.3);
      padding: 16px;
      text-align: left;
    }

    &__skill {
      grid-column: 1 / 7;
      margin: 16px;

      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;

      .skill-item {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: 2px solid #aaa;
      }
    }
  }
}
</style>
