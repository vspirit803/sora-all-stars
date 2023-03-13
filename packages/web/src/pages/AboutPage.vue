<script setup lang="ts">
import { Game } from "@sora-all-stars/core";

const game = Game.instance;

</script>

<template>
  <div class="page-about">
    <h1>About</h1>
    <p>This is an about page</p>
    <p>版本: {{ game.version }}</p>
    <p>存档开始时间: {{ game.startTime.toLocaleString() }}</p>
    <p v-if="game.lastSaveTime">
      上次存档时间: {{ game.lastSaveTime.toLocaleString() }}
    </p>
  </div>
</template>

<style lang="postcss" scoped>
.page-about {}
</style>
