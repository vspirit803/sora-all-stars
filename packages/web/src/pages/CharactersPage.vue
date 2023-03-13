<script setup lang="ts">
import { CharacterConfig, CharacterConfigManager, Game } from "@sora-all-stars/core";
import { Ref, ref } from "vue";

const game = Game.instance;

const charactersMap = game.characterMap;
const configMap = CharacterConfigManager.characterItemConfigMap;
const characterConfigs: CharacterConfig[] = Array.from(configMap.values());

const selectedCharacterConfig: Ref<CharacterConfig> = ref(characterConfigs[0]);

function clickHandler(config: CharacterConfig) {
  selectedCharacterConfig.value = config;
}

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
          'character-list__item--unlock': !charactersMap.has(each.id),
        }"
        @click="() => clickHandler(each)"
      >
        <!-- <img
          class="character-list__item-image"
          :src="`/images/characters/${each.id}.jpg`"
        > -->
        <img
          class="character-list__item-image"
          src="/vite.svg"
        >
      </div>
    </div>
    <div class="character-detail">
      <template v-if="selectedCharacterConfig">
        <div class="character-detail__name">
          {{ selectedCharacterConfig.name }}  {{ selectedCharacterConfig.gender === "M" ? "♂" : "♀" }}
        </div>
        <div class="character-detail__image" />
        <div class="character-detail__source">
          出自: {{ selectedCharacterConfig.source }}
        </div>
        <div class="character-detail__property">
          <template
            v-for="(propConfig, propName) in selectedCharacterConfig.properties"
            :key="propName"
          >
            <div class="property-item__name">
              {{ propName }}
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
      aspect-ratio: 1 / 1;
      border-radius: 8px;
      position: relative;
      transition: all 0.1s ease-in-out;

      &:hover {
        outline: 2px solid #aaa;
        transform: scale(1.1);
      }

      &--selected {
        outline: 2px solid #aaa;
        transform: scale(1.1);
      }

      &--unlock {
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
          color: #aaa;
          font-size: 64px;
          font-weight: bold;
        }
      }
    }

    &__item-image {
      width: 100%;
      object-fit: cover;
      display: block;
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
      grid-row: 1 / 4;
      background-color: #aaa;
      border-radius: 8px;

      aspect-ratio: 2 / 3;
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
        }

        &__base {
        }

        &__growth {
        }
      }
    }

    &__description {
      grid-column: 1 / 13;
      margin: 16px;
      background-color: rgba(255, 228, 196, 0.3);
      padding: 16px;
      text-align: left;
    }
  }
}
</style>
