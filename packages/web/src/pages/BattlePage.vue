<script setup lang="ts">
import { DynamicBattleActionManager } from "@sora-all-stars/core";
import { Battle, BattleEventType, BattleResult, type IActionEndEventData, type IActionStartEventData, type IBattleObject, type IDamagedEventData, type IHealedEventData, type ITurnEndEventData, type ITurnStartEventData, sleep } from "@sora-all-stars/core";
import { onBeforeUnmount, type Ref, ref, shallowRef } from "vue";

import { ACTION_DELAY } from "../constants";
import BattleCharacterUI from "./BattleCharacterUI.vue";
import BattleProgressBar from "./BattleProgressBar.vue";
import BattleStats from "./BattleStats.vue";

interface IBattleUIObject { // 直接导入似乎eslint无法识别
  id: string;
  uuid: string;
  name: string;
  hp: number;
  currHP: number;
}

interface IBattleUI {
  name: string;
  teams: IBattleUIObject[][];
}

const battleUI: Ref<IBattleUI | null> = ref(null);
const battleRound: Ref<number> = ref(0);
const battleStat: Ref<Record<string, { damage: number; damaged: number, heal: number, roundCount: number }>> = ref({});
const battle = shallowRef<Battle | null>(null);
const battleProgress: Ref<Array<[IBattleObject, number, number]>> = ref([]);

function turnStartHandler(data: ITurnStartEventData) {
  battleRound.value = data.turn;
  console.log(`==========第 ${data.turn} 回合开始==========`);
}

function turnEndHandler(data: ITurnEndEventData) {
  console.log(`==========第 ${data.turn} 回合结束==========`);
}

function damagedHandler(data: IDamagedEventData) {
  if (!battleUI.value) {
    return;
  }

  const character = battleUI.value.teams.flat().find((each) => each.uuid === data.target.uuid);

  if (!character) {
    return;
  }

  const attacker = data.source.name;
  const target = data.target.name;

  if (!battleStat.value[attacker]) {
    battleStat.value[attacker] = {
      damage: 0,
      damaged: 0,
      heal: 0,
      roundCount: 0,
    };
  }

  if (!battleStat.value[target]) {
    battleStat.value[target] = {
      damage: 0,
      damaged: 0,
      heal: 0,
      roundCount: 0,
    };
  }

  battleStat.value[attacker].damage += data.realDamage;
  battleStat.value[target].damaged += data.realDamage;

  character.currHP -= data.realDamage;
}

function healedHandler(data: IHealedEventData) {
  if (!battleUI.value) {
    return;
  }

  const character = battleUI.value.teams.flat().find((each) => each.uuid === data.target.uuid);

  if (!character) {
    return;
  }

  const healer = data.source.name;

  if (!battleStat.value[healer]) {
    battleStat.value[healer] = {
      damage: 0,
      damaged: 0,
      heal: 0,
      roundCount: 0,
    };
  }

  battleStat.value[healer].heal += data.realHealValue;

  character.currHP += data.realHealValue;
}

function actionStartHandle(data: IActionStartEventData) {
  if (!battle.value) {
    return;
  }

  const actionManger = battle.value.battleActionManager;

  if (!(actionManger instanceof DynamicBattleActionManager)) {
    return;
  }

  battleProgress.value = actionManger.getSortedProgress();
}

async function actionEndHandler(data: IActionEndEventData) {
  if (!battleUI.value) {
    return;
  }

  const character = battleUI.value.teams.flat().find((each) => each.uuid === data.target.uuid);

  if (!character) {
    return;
  }

  const characterName = data.target.name;

  if (!battleStat.value[characterName]) {
    battleStat.value[characterName] = {
      damage: 0,
      damaged: 0,
      heal: 0,
      roundCount: 0,
    };
  }

  battleStat.value[characterName].roundCount += 1;

  await sleep(ACTION_DELAY);
}

function start() {
  if (battle.value) {
    battle.value.removeListener(BattleEventType.TURN_START, turnStartHandler);
    battle.value.removeListener(BattleEventType.TURN_END, turnEndHandler);
    battle.value.removeListener(BattleEventType.DAMAGED, damagedHandler);
    battle.value.removeListener(BattleEventType.HEALED, healedHandler);
    battle.value.removeListener(BattleEventType.ACTION_START, actionStartHandle);
    battle.value.removeListener(BattleEventType.ACTION_END, actionEndHandler);
    battle.value.cancel();
  }
  console.clear();

  const currBattle = battle.value = Battle.generateBattle();

  battleUI.value = {
    name: currBattle.name,
    teams: currBattle.teams.map((each) => each.map((each) => ({
      id: each.id,
      name: each.name,
      uuid: each.uuid,
      hp: each.hp,
      currHP: each.currHP,
    }))),
  };

  battleRound.value = 0;
  battleStat.value = {};

  currBattle.listen(BattleEventType.TURN_START, turnStartHandler);
  currBattle.listen(BattleEventType.TURN_END, turnEndHandler);
  currBattle.listen(BattleEventType.DAMAGED, damagedHandler);
  currBattle.listen(BattleEventType.HEALED, healedHandler);
  currBattle.listen(BattleEventType.ACTION_START, actionStartHandle);
  currBattle.listen(BattleEventType.ACTION_END, actionEndHandler);

  void currBattle.execute().then((result) => {
    if (result === BattleResult.WIN) {
      console.log(`==========经过 ${currBattle.turn} 回合, 战斗胜利==========`);
      battle.value = null;
    } else if (result === BattleResult.LOSE) {
      console.log(`==========经过 ${currBattle.turn} 回合, 战斗失败==========`);
      battle.value = null;
    } else if (result === BattleResult.CANCEL) {
      console.log("战斗被取消了");
    }
  });
}

onBeforeUnmount(() => {
  battle.value?.cancel();
  battle.value = null;
});

</script>
<template>
  <div class="battle-page">
    <div v-if="battleUI !== null" class="battle-name">
      {{ battleUI.name }}
    </div>
    <v-btn class="battle-start" @click="start">
      开始
    </v-btn>
    <div class="battle-stat">
      <div>回合数: {{ battleRound }}</div>
      <BattleStats :battle-stats="battleStat" />
    </div>
    <BattleProgressBar class="battle-progress-bar" :progress="battleProgress" />
    <div v-if="battleUI !== null && battle" class="battle-team battle-team-2">
      <BattleCharacterUI
        v-for="each of battleUI.teams[1]"
        :key="each.id"
        :battle="battle"
        :character="each"
      />
    </div>
    <div v-if="battleUI !== null && battle" class="battle-team battle-team-1">
      <BattleCharacterUI
        v-for="each of battleUI.teams[0]"
        :key="each.id"
        :battle="battle"
        :character="each"
      />
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.battle {
  &-page {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &-name {
    font-size: 64px;
    line-height: 64px;
    margin-top: 400px;
    margin-right: 800px;
  }

  &-start {
    position: absolute;
    top: 410px;
    left: 10px;
  }

  &-stat {
    position: absolute;
    bottom: 10px;
    left: 10px;
  }

  &-progress-bar {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  &-team {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;

    &-1 {
      flex-direction: row-reverse;
      position: absolute;
      bottom: 50px;
      right: 50px;
    }

    &-2 {
      position: absolute;
      top: 50px;
      left: 50px;
    }
  }

  &-character {
    width: 192px;
    height: 192px;
  }
}
</style>
