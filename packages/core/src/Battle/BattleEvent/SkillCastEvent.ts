import { type IBattleObject } from "../IBattleObject";
import { type IBattleSkill } from "../IBattleSkill";
import { BaseBattleEvent, type IBattleEventData } from "./BaseBattleEvent";
import { BattleEventType } from "./BattleEventType";

export interface ISkillCastEventData extends IBattleEventData {
  type: BattleEventType.SKILL_CAST;
  caster: IBattleObject;
  target: IBattleObject;
  skill: IBattleSkill
}

export class SkillCastEvent extends BaseBattleEvent {
  constructor(data: ISkillCastEventData) {
    super(BattleEventType.SKILL_CAST, data);
  }
}
