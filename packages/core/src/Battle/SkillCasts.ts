import { BattleEventType, type IHealedEventData, type ISkillCastEventData } from "./BattleEvent";
import { type IBattleObject } from "./IBattleObject";
import { type GetSkillPriority, type GetSkillTarget, type IBattleSkill, type SkillCast } from "./IBattleSkill";

interface ISkillScript {
  cast: SkillCast;
  getPriority: GetSkillPriority;
  getTarget?: GetSkillTarget;
}

export const SkillCasts = {
  斩击: {
    cast: (async function (this: IBattleSkill, target: IBattleObject) {
      const battle = this.owner.battle;

      const data: ISkillCastEventData = {
        type: BattleEventType.SKILL_CAST,
        skill: this,
        caster: this.owner,
        target,
      };

      await battle.dispatch(BattleEventType.SKILL_CAST, data);
      await target.attacked(this.owner);

    }),
    getPriority: function (this: IBattleSkill) {
      return 1;
    },
  },
  唧唧歪歪: {
    cast: async function (this: IBattleSkill, target: IBattleObject) {
      const battle = this.owner.battle;
      const targets = target.team.filter(each => each.isAlive);

      await Promise.all(targets.map(async each => {
        const data: ISkillCastEventData = {
          type: BattleEventType.SKILL_CAST,
          skill: this,
          caster: this.owner,
          target: each,
        };

        await battle.dispatch(BattleEventType.SKILL_CAST, data);
        await each.attacked(this.owner);
      }));
    },
    getPriority: function (this: IBattleSkill) {
      return 1;
    },
  },
  推气过宫: {
    cast: async function (this: IBattleSkill, target: IBattleObject) {
      const battle = this.owner.battle;
      const targets = target.team.filter(each => each.isAlive);
      const baseHealValue = this.owner.hp * 0.06;

      await Promise.all(targets.map(async each => {
        const data: ISkillCastEventData = {
          type: BattleEventType.SKILL_CAST,
          skill: this,
          caster: this.owner,
          target: each,
        };

        await battle.dispatch(BattleEventType.SKILL_CAST, data);
        const healValue = target === each ? baseHealValue * 1.5 : baseHealValue;
        const isCrit = Math.random() < this.owner.critRate;

        const healedData: IHealedEventData = {
          type: BattleEventType.HEALED,
          source: this.owner,
          target: each,
          healValue,
          realHealValue: isCrit ? healValue * this.owner.critDmg : healValue,
        };

        await battle.dispatch(BattleEventType.HEALED, healedData);
      }));
    },
    getPriority: function (this: IBattleSkill) {
      const hasMemberInDanger = this.owner.team.some((each) => each.currHP / each.hp < 0.8);

      if (hasMemberInDanger) {
        return 3;
      }

      return 1;
    },
    getTarget: function (this: IBattleSkill) {
      const members = this.owner.team.filter(each => each.isAlive);
      // get the member with lowest hp
      const target = members.reduce((prev, curr) => curr.currHP < prev.currHP ? curr : prev);

      return target;
    },
  },
  无想的一刀: {
    cast: async function (this: IBattleSkill, target: IBattleObject) {
      const battle = this.owner.battle;

      const targets = target.team.filter(each => each.isAlive);

      await Promise.all(targets.map(async each => {
        const data: ISkillCastEventData = {
          type: BattleEventType.SKILL_CAST,
          skill: this,
          caster: this.owner,
          target: each,
        };

        await battle.dispatch(BattleEventType.SKILL_CAST, data);
        await each.attacked(this.owner, 0.75);
      }));
    },
    getPriority: function (this: IBattleSkill) {
      return 2;
    },
  },
} satisfies Record<string, ISkillScript>;
