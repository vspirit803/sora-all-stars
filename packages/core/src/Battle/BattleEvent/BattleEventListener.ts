import { type UUID } from "@core/base";

import { type IBattleEventData } from "./BaseBattleEvent";
import { type BattleEventType } from "./BattleEventType";

export interface IBattleEventListener {
  eventType: BattleEventType;
  handler: (data: IBattleEventData) => Promise<void> | void;
  eventID: UUID;
}
