import { type IBattleObject } from "../IBattleObject";
import { BaseBattleEvent, type IBattleEventData } from "./BaseBattleEvent";
import { BattleEventType } from "./BattleEventType";

export interface IHealEventData extends IBattleEventData {
  type: BattleEventType.HEAL;
  source: IBattleObject;
  target: IBattleObject;
  healValue: number;
  realHealValue: number;
}

export class HealEvent extends BaseBattleEvent {
  constructor(data: IHealEventData) {
    super(BattleEventType.HEAL, data);
  }
}
