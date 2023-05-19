import { type IBattleObject } from "../IBattleObject";
import { BaseBattleEvent, type IBattleEventData } from "./BaseBattleEvent";
import { BattleEventType } from "./BattleEventType";

export interface IDamageEventData extends IBattleEventData {
  type: BattleEventType.DAMAGE;
  source: IBattleObject;
  target: IBattleObject;
  damage: number;
  realDamage: number;
}

export class DamageEvent extends BaseBattleEvent {
  constructor(data: IDamageEventData) {
    super(BattleEventType.DAMAGE, data);
  }
}
