import { type UUID } from "@core/base";
import { type Battle, type IBattleObject } from "@core/Battle";

import { DispelType } from "./DispelType";

/**
 * 抽象的Buff基类
 */
export abstract class AbstractBuff {
  uuid: UUID;
  dispelType: DispelType;
  battle: Battle;
  owner: IBattleObject;
  from: IBattleObject;

  constructor({
    uuid = crypto.randomUUID(),
    dispelType = DispelType.Weak,
    battle,
    owner,
    from,
  }: {
    uuid?: UUID;
    dispelType?: DispelType;
    battle: Battle;
    owner: IBattleObject;
    from: IBattleObject;
  }) {
    this.uuid = uuid;
    this.dispelType = dispelType;
    this.battle = battle;
    this.owner = owner;
    this.from = from;
  }

  abstract mount(): void;
  abstract unmount(): void;
}
