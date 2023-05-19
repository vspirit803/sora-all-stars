import { BaseBattleEvent, type IBattleEventData } from "./BaseBattleEvent";
import { BattleEventType } from "./BattleEventType";

export interface ITurnStartEventData extends IBattleEventData {
  type: BattleEventType.TURN_START;
  turn: number;
}

export class TurnStartEvent extends BaseBattleEvent {
  constructor(data: ITurnStartEventData) {
    super(BattleEventType.TURN_START, data);
  }
}
