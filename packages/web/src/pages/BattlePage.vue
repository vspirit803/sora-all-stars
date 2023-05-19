<script setup lang="ts">
import { Battle, BattleEventType, BattleResult } from "@sora-all-stars/core";
import { onBeforeUnmount, type Ref, ref, shallowRef } from "vue";

import { ACTION_DELAY } from "../constants";
import BattleCharacterUI, { type IBattleUIObject } from "./BattleCharacterUI.vue";

interface IBattleUI {
  name: string;
  teams: IBattleUIObject[][];
}

const battleUI: Ref<IBattleUI | null> = ref(null);
const battleStat: Ref<Record<string, number>> = ref({});
const battle = shallowRef<Battle | null>(null);

function start() {
  battle.value?.cancel();
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

  battleStat.value = {
    turn: 0,
  };

  currBattle.listen(BattleEventType.TURN_START, async(data) => {
    battleStat.value.turn = data.turn;
    console.log(`==========第 ${data.turn} 回合开始==========`);
  });

  currBattle.listen(BattleEventType.TURN_END, (data) => {
    console.log(`==========第 ${data.turn} 回合结束==========`);
  });

  currBattle.listen(BattleEventType.DAMAGED, (data) => {
    if (!battleUI.value) {
      return;
    }

    const character = battleUI.value.teams.flat().find((each) => each.uuid === data.target.uuid);

    if (!character) {
      return;
    }

    const attacker = data.source.name;
    const totalDamage = battleStat.value[`damage_${attacker}`] ?? 0;
    battleStat.value[`damage_${attacker}`] = totalDamage + data.realDamage;
    const totalDamated = battleStat.value[`damaged_${data.target.name}`] ?? 0;
    battleStat.value[`damaged_${data.target.name}`] = totalDamated + data.realDamage;

    // console.log(`[${data.source.name}] 对 [${data.target.name}] 造成了 ${data.realDamage} 点伤害(原始伤害: ${data.damage})`);
    character.currHP -= data.realDamage;
  });

  currBattle.listen(BattleEventType.HEALED, async(data) => {
    if (!battleUI.value) {
      return;
    }

    const character = battleUI.value.teams.flat().find((each) => each.uuid === data.target.uuid);

    if (!character) {
      return;
    }

    const healer = data.source.name;
    const totalHealValue = battleStat.value[`heal_${healer}`] ?? 0;
    battleStat.value[`heal_${healer}`] = totalHealValue + data.realHealValue;

    // console.log(`[${data.source.name}] 对 [${data.target.name}] 治疗了 ${data.realHealValue} 点生命值(原始治疗: ${data.healValue})`);
    character.currHP += data.realHealValue;
  });

  currBattle.listen(BattleEventType.ACTION_END, async(data) => {
    await new Promise((resolve) => setTimeout(resolve, ACTION_DELAY));
  });

  currBattle.execute().then((result) => {
    if (result === BattleResult.WIN) {
      console.log(`==========经过 ${currBattle.turn} 回合, 战斗胜利==========`);
    } else if (result === BattleResult.LOSE) {
      console.log(`==========经过 ${currBattle.turn} 回合, 战斗失败==========`);
    } else if (result === BattleResult.CANCEL) {
      console.log("战斗被取消了");
    }

    battle.value = null;
  }, () => void 0);
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
      <div>回合数: {{ battleStat.turn }}</div>
      <div
        v-for="each of Object.keys(battleStat).filter((each) => each.startsWith('damage_'))"
        :key="each"
      >
        {{ each.replace('damage_', '') }} 造成伤害: {{ battleStat[each] }}
      </div>
      <div
        v-for="each of Object.keys(battleStat).filter((each) => each.startsWith('heal_'))"
        :key="each"
      >
        {{ each.replace('heal_', '') }} 治疗生命值: {{ battleStat[each] }}
      </div>
      <div
        v-for="each of Object.keys(battleStat).filter((each) => each.startsWith('damaged_'))"
        :key="each"
      >
        {{ each.replace('damaged_', '') }} 受到伤害: {{ battleStat[each] }}
      </div>
    </div>
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
