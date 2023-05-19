import { type IBattleObject } from "../IBattleObject";
import { type IBattleSkill } from "../IBattleSkill";
import { BaseBattleEvent, type IBattleEventData } from "./BaseBattleEvent";
import { BattleEventType } from "./BattleEventType";

export interface ISkillCastedEventData extends IBattleEventData {
  type: BattleEventType.SKILL_CASTED;
  caster: IBattleObject;
  target: IBattleObject;
  skill: IBattleSkill
}

export class SkillCastedEvent extends BaseBattleEvent {
  constructor(data: ISkillCastedEventData) {
    super(BattleEventType.SKILL_CASTED, data);
  }
}
