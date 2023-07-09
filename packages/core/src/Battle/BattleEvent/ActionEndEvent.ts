import { type IBattleObject } from "../IBattleObject";
import { BaseBattleEvent, type IBattleEventData } from "./BaseBattleEvent";
import { BattleEventType } from "./BattleEventType";

export interface IActionEndEventData extends IBattleEventData {
  type: BattleEventType.ACTION_END;
  target: IBattleObject;
}

export class ActionEndEvent extends BaseBattleEvent {
  constructor(data: IActionEndEventData) {
    super(BattleEventType.ACTION_END, data);
  }
}
