import { type Battle, type BattleTeam } from "./Battle";
import { type IBattleObject } from "./IBattleObject";

/**
 * AbstractBattleActionManager.
 */
export abstract class AbstractBattleActionManager {
  turnCount: number;

  constructor(battle: Battle, teams: BattleTeam[]) {
    this.turnCount = 0;
  }

  abstract getNextActionObject(): IBattleObject;

  /**
   * Sync queue when a battle object is added or removed.
   */
  abstract syncQueue(): void;
}
