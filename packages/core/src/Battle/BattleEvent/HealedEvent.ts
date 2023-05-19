import { type IBattleObject } from "../IBattleObject";
import { BaseBattleEvent, type IBattleEventData } from "./BaseBattleEvent";
import { BattleEventType } from "./BattleEventType";

export interface IHealedEventData extends IBattleEventData {
  type: BattleEventType.HEALED;
  source: IBattleObject;
  target: IBattleObject;
  healValue: number;
  realHealValue: number;
}

export class HealedEvent extends BaseBattleEvent {
  constructor(data: IHealedEventData) {
    super(BattleEventType.HEALED, data);
  }
}
