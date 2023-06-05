<script setup lang="ts">
import { mdiFlaskEmpty, mdiFlaskRoundBottomEmpty, mdiShield, mdiShoeFormal, mdiSword } from "@mdi/js";
import { type CharacterConfig, CharacterConfigManager, type CharacterPropertyConfig, Game, SkillConfigManager } from "@sora-all-stars/core";
import { type Ref, ref } from "vue";

import FallbackImage from "../components/FallbackImage.vue";
import RarityItemUI from "../components/RarityItemUI.vue";

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
      <RarityItemUI
        v-for="each of characterConfigs"
        :key="each.id"
        class="character-list__item"
        :text="each.name"
        :rarity="each.rarity"
        :selected="each.id === selectedCharacterConfig.id"
        :img-url="`/images/character/avatar/${each.id}.webp`"
        @click="() => clickHandler(each)"
      />
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
            :aspect-ratio="2 / 3"
          />
        </div>
        <div class="character-detail__source">
          出自: {{ selectedCharacterConfig.source }}
        </div>
        <div class="character-detail__property">
          <template v-for="(propConfig, propName) in selectedCharacterConfig.properties" :key="propName">
            <div class="property-item__name">
              <v-icon
                class="property-item__name-icon"
                :color=" ICON_MAP[propName].color"
                :icon="ICON_MAP[propName].path"
                :size="36"
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
    display: flex;
    flex-wrap: wrap;
    padding: 16px;
    gap: 16px;

    &__item {
      width: calc((100% - 64px) / 5);
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

        aspect-ratio: 1 / 1;
        width: 100%;
        /* height: 100%; */
        display: flex;
        align-items: center;
        justify-content: center;
        outline: 2px solid #aaa;
      }
    }
  }
}
</style>
