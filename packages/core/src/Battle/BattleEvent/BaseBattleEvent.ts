import { type BattleEventType } from "./BattleEventType";

export interface IBattleEventData {
  type: BattleEventType;
  [key: string]: unknown;
}

export class BaseBattleEvent {
  type: BattleEventType;
  data: IBattleEventData;

  private isPreventDefault: boolean;

  constructor(type: BattleEventType, data: IBattleEventData) {
    this.type = type;
    this.data = data;

    this.isPreventDefault = false;
  }

  preventDefault() {
    this.isPreventDefault = true;
  }

  isDefaultPrevented() {
    return this.isPreventDefault;
  }
}
