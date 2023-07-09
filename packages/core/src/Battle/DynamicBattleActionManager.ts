import { type Battle, type BattleTeam } from "./Battle";
import { BattleEventType } from "./BattleEvent";
import { type IBattleObject } from "./IBattleObject";

/**
 * DynamicBattleActionManager.
 * @description 动态行动管理器, 用于实现回合制战斗, 行动顺序由行动对象的速度决定, 并且随时动态调整, 类似阴阳师, 崩坏:星穹铁道等游戏的战斗系统.
 */
export class DynamicBattleActionManager {
  battle: Battle;
  teams: BattleTeam[];
  turnCount: number;

  #progressMap: Map<IBattleObject, number>;
  #timeUsed: number;

  constructor(battle: Battle, teams: BattleTeam[]) {
    this.battle = battle;
    this.teams = teams;
    this.turnCount = 0;

    this.#progressMap = new Map();
    this.#timeUsed = 0;

    this.syncQueue();

    this.battle.listen(BattleEventType.ACTION_END, (data) => {
      const battleObject = data.target;

      if (this.#progressMap.has(battleObject)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.#progressMap.set(battleObject, this.#progressMap.get(battleObject)! - DynamicBattleActionManager.#MaxProgress);

        // const data = Array.from(this.#progressMap.entries()).map(([obj, progress]) => [
        //   obj.name, progress,
        // ]);

        // data.unshift(["姓名", "进度"]);

        // console.table(data);
      }
    });
  }

  private getAllBattleObjects(): IBattleObject[] {
    return this.teams.flatMap(eachTeam => eachTeam);
  }

  getNextActionObject(): IBattleObject {
    const allObjects: Array<{ battleObject: IBattleObject; currProgress: number; leftTime: number }> = this.getAllBattleObjects().map(each => {
      return {
        battleObject: each,
        currProgress: this.#progressMap.get(each) ?? 0,
        leftTime: each.isAlive ? (DynamicBattleActionManager.#MaxProgress - (this.#progressMap.get(each) ?? 0)) / each.spd : Number.MAX_VALUE,
      };
    });

    const minLeftTime = Math.min(...allObjects.map(each => each.leftTime));
    const nextActionObject = allObjects.sort(
      (a, b) => a.leftTime - b.leftTime,
    )[0].battleObject;

    this.#timeUsed += minLeftTime;

    for (const [eachBattleObject, eachProgress] of this.#progressMap.entries()) {
      if (!eachBattleObject.isAlive) {
        continue;
      }

      this.#progressMap.set(eachBattleObject, eachProgress + minLeftTime * eachBattleObject.spd);
    }

    return nextActionObject;
  }

  /**
   * Sync queue when a battle object is added or removed.
   */
  syncQueue(): void {
    this.getAllBattleObjects().forEach(eachBattleObject => {
      if (!this.#progressMap.has(eachBattleObject)) {
        this.#progressMap.set(eachBattleObject, 0);
      }
    });
  }

  getProgressMap(): Map<IBattleObject, number> {
    return this.#progressMap;
  }

  getSortedProgress(): Array<[IBattleObject, number, number]> {
    return Array.from(this.#progressMap.entries())
      .map(([obj, progress]) => [obj, progress / DynamicBattleActionManager.#MaxProgress, (DynamicBattleActionManager.#MaxProgress - progress) / obj.spd] as [IBattleObject, number, number])
      .sort((a, b) => a[2] - b[2]);
  }

  static #MaxProgress = 10000;
}
