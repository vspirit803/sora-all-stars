import { type IBattleObject } from "../IBattleObject";
import { BaseBattleEvent, type IBattleEventData } from "./BaseBattleEvent";
import { BattleEventType } from "./BattleEventType";

export interface IDamagedEventData extends IBattleEventData {
  type: BattleEventType.DAMAGED;
  source: IBattleObject;
  target: IBattleObject;
  damage: number;
  shiledReducedDamage?: number;
  realDamage: number;
}

export class DamagedEvent extends BaseBattleEvent {
  constructor(data: IDamagedEventData) {
    super(BattleEventType.DAMAGED, data);
  }
}
