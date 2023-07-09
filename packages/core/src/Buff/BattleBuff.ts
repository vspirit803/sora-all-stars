import { type UUID } from "@core/base";
import { type Battle, type IBattleObject } from "@core/Battle";

import { AbstractBuff } from "./AbstractBuff";
import { DispelType } from "./DispelType";

/**
 * 战斗中的Buff
 */
export class BattleBuff extends AbstractBuff {
  name: string;
  visible: boolean;
  description: string;
  parent?: BattleBuff;
  children: BattleBuff[] = [];

  constructor({
    uuid = crypto.randomUUID(),
    dispelType = DispelType.Weak,
    battle,
    owner,
    from,
    name = "",
    visible = true,
    description = "",
  }: {
    uuid?: UUID;
    dispelType?: DispelType;
    battle: Battle;
    owner: IBattleObject;
    from: IBattleObject;
    name?: string;
    visible?: boolean;
    description?: string;
  }) {
    super({
      uuid,
      dispelType,
      battle,
      owner,
      from,
    });

    this.name = name;
    this.visible = visible;
    this.description = description;
  }

  mount(): boolean {
    console.log(`${this.owner.name} 获得了 ${this.name} 效果`);

    const mountedBuffs = this.children.filter((buff) => {
      buff.parent = this;
      return buff.mount();
    });

    if (mountedBuffs.length === 0) {
      return false;
    }

    this.owner.buffs.push(this);
    return true;
  }

  unmount(): void {
    console.log(`${this.owner.name} 失去了 ${this.name} 效果`);
  }
}
