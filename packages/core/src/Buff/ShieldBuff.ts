import { type UUID } from "@core/base";
import { type Battle, BattleEventType, type IBattleObject, type IDamagedEventData } from "@core/Battle";

import { AbstractBuff } from "./AbstractBuff";
import { BattleBuff } from "./BattleBuff";
import { DispelType } from "./DispelType";

/**
 * 护盾Buff
 */
export class ShieldBuff extends BattleBuff {
  private shield = 0;

  constructor({
    battle,
    owner,
    from,
  }: {
    battle: Battle;
    owner: IBattleObject;
    from: IBattleObject;
  }) {
    super({
      battle,
      owner,
      from,
      name: "玉璋护盾",
      description: "岩王帝君赋予的玉璋护盾, 可以抵挡绝大多数伤害",
      dispelType: DispelType.None,
    });
  }

  override mount(): boolean {
    this.shield = this.from.hp * 0.2;

    const existingBuffs = this.parent?.children ?? this.owner.buffs;
    const existingBuff = existingBuffs.find((buff) => buff instanceof ShieldBuff) as ShieldBuff | undefined;

    if (existingBuff) {
      console.log(`${this.owner.name} 的护盾刷新为 ${this.shield} 点`);
      existingBuff.shield = Math.max(existingBuff.shield, this.shield);
      return false;
    }

    this.battle.listen(BattleEventType.DAMAGED, this.onDamagedHandler);

    console.log(`${this.owner.name} 获得了 ${this.name} 效果 ${this.uuid}, 护盾为 ${this.shield} 点`);

    if (!this.parent) {
      this.owner.buffs.push(this);
    }

    return true;
  }

  override unmount(): void {
    console.log(`${this.owner.name} 的护盾 ${this.uuid} 消失了`);

    if (!this.parent) {
      this.owner.buffs = this.owner.buffs.filter((buff) => buff !== this);
    } else {
      this.parent.children = this.parent.children.filter((buff) => buff !== this);
    }

    this.battle.removeListener(BattleEventType.DAMAGED, this.onDamagedHandler);
  }

  onDamagedHandler = (data: IDamagedEventData) => {
    if (data.target !== this.owner) {
      return;
    }

    const deltaDamage = Math.min(this.shield, data.realDamage);
    data.realDamage -= deltaDamage;
    data.shiledReducedDamage = (data.shiledReducedDamage ?? 0) + deltaDamage;
    this.shield -= deltaDamage;

    console.log(`${this.owner.name} 的护盾 ${this.uuid} 减少了 ${deltaDamage} 点, 剩余 ${this.shield} 点`);

    if (this.shield <= 0) {
      this.unmount();
    }
  };
}
