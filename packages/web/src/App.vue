<script setup lang="ts">
import { Game } from "@sora-all-stars/core";
import { RouterView } from "vue-router";

const game = Game.instance;
// const rawSave = localStorage.getItem("save");
const rawSave = null;

if (rawSave !== null) {
  game.loadSave(JSON.parse(rawSave));
} else {
  game.init();
}

(window as unknown as Window & { game: Game }).game = game;
console.log(game);

save();

function save() {
  localStorage.setItem("save", JSON.stringify(game.generateSave()));
}
</script>

<template>
  <div class="app">
    <div class="toolbar">
      <button type="button" @click="save">
        保存
      </button>
      <button type="button" @click="() => game.onBattleStart()">
        战斗开始
      </button>
      <button type="button" @click="() => $router.push('/')">
        首页
      </button>
      <button type="button" @click="() => $router.push('/characters')">
        角色图鉴
      </button>
      <button type="button" @click="() => $router.push('/about')">
        关于
      </button>
    </div>

    <RouterView />
  </div>
</template>

<style lang="postcss" scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 1280px;
  user-select: none;

  aspect-ratio: 16 / 9;
  background-color: #242424;

  .toolbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;

    display: flex;
    gap: 10px;

    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
