import { BaseBattleEvent, type IBattleEventData } from "./BaseBattleEvent";
import { BattleEventType } from "./BattleEventType";

export interface ITurnEndEventData extends IBattleEventData {
  type: BattleEventType.TURN_END;
  turn: number;
}

export class TurnEndEvent extends BaseBattleEvent {
  constructor(data: ITurnEndEventData) {
    super(BattleEventType.TURN_END, data);
  }
}
