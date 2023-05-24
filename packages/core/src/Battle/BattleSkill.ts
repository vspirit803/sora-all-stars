import { BattleEventType, type ISkillCastEventData } from "./BattleEvent";
import { type IBattleObject } from "./IBattleObject";
import { type GetSkillPriority, type GetSkillTarget, type IBattleSkill, type SkillCast } from "./IBattleSkill";

export class BattleSkill implements IBattleSkill {
  id: string;
  name: string;
  owner: IBattleObject;
  cast: SkillCast;
  getPriority: GetSkillPriority;
  getTarget: GetSkillTarget;

  constructor(id: string, name: string, owner: IBattleObject, cast: SkillCast = DefaultCast, getPriority: GetSkillPriority = DefaultGetPriority, getTarget: GetSkillTarget = DefaultGetTarget) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.cast = cast.bind(this);
    this.getPriority = getPriority.bind(this);
    this.getTarget = getTarget.bind(this);
  }
}

const DefaultCast: SkillCast = async function (target) {
  console.log(`[${this.owner.name}] 对 [${target.name}] 释放了 [${this.name}]`);

  const battle = this.owner.battle;

  const data: ISkillCastEventData = {
    type: BattleEventType.SKILL_CAST,
    skill: this,
    caster: this.owner,
    target,
  };

  await battle.dispatch(BattleEventType.SKILL_CAST, data);
};

const DefaultGetPriority: GetSkillPriority = function () {
  return 1;
};

const DefaultGetTarget: GetSkillTarget = function () {
  return this.owner.getTarget();
};
