import { type IBattleObject } from "../IBattleObject";
import { BaseBattleEvent, type IBattleEventData } from "./BaseBattleEvent";
import { BattleEventType } from "./BattleEventType";

export interface IActionStartEventData extends IBattleEventData {
  type: BattleEventType.ACTION_START;
  target: IBattleObject;
}

export class ActionStartEvent extends BaseBattleEvent {
  constructor(data: IActionStartEventData) {
    super(BattleEventType.ACTION_START, data);
  }
}
