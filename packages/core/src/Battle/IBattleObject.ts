import { type Battle, type BattleTeam } from "./Battle";
import { BattleEventType, type IDamagedEventData, type IHealedEventData } from "./BattleEvent";
import { type IBattleSkill } from "./IBattleSkill";

export interface IBattleObject {
  battle: Battle;
  team: BattleTeam;

  id: string;
  name: string;
  uuid: string;

  atk: number;
  def: number;
  hp: number;
  mp: number;
  spd: number;
  critRate: number;
  critDmg: number;
  skills: IBattleSkill[];

  currHP: number;
  currMP: number;

  isStunned: boolean;
  isSilenced: boolean;

  get isDead(): boolean;
  get isAlive(): boolean;

  getTarget: () => IBattleObject;

  attack: typeof IBattleObjectDefaultImplement.attack;
  attacked: typeof IBattleObjectDefaultImplement.attacked;

  heal: typeof IBattleObjectDefaultImplement.heal;
  healed: typeof IBattleObjectDefaultImplement.healed;

  onHealed: (data: IHealedEventData) => void;
}

export class IBattleObjectDefaultImplement {
  static attack(this: IBattleObject, target: IBattleObject) {
    const { name, atk, critRate, critDmg } = this;
    const { def } = target;
  }

  static async attacked(this: IBattleObject, source: IBattleObject, atkRatio = 1) {
    const { name, atk, critRate, critDmg } = source;
    const { def } = this;

    const isCrit = Math.random() < critRate;
    const damage = Math.max(10, Math.floor(atk * (isCrit ? critDmg : 1) * atkRatio - def) );
    const realDamage = Math.min(damage, this.currHP);

    const data: IDamagedEventData = {
      type: BattleEventType.DAMAGED,
      source,
      target: this,
      damage,
      realDamage,
    };

    await this.battle.dispatch(BattleEventType.DAMAGED, data);

    this.currHP -= Math.min(data.realDamage, this.currHP);
  }

  static heal(this: IBattleObject, target: IBattleObject) {
    const { name, atk, critRate, critDmg } = this;

    const isCrit = Math.random() < critRate;
    const healValue = Math.max(10, Math.floor(atk * (isCrit ? critDmg : 1)) );
    const realHealValue = Math.min(healValue, target.hp - target.currHP);

    // console.log(`${name} 对 ${target.name} 造成了 ${realHealValue} 点${isCrit ? "暴击" : ""}治疗`);

    target.currHP += realHealValue;

    // this.battle.dispatch(BattleEventType.ATTACK, {})
  }

  static async healed(this: IBattleObject, source: IBattleObject) {
    const { name, atk, critRate, critDmg } = source;

    const isCrit = Math.random() < critRate;
    const healValue = Math.max(10, Math.floor(atk * (isCrit ? critDmg : 1)) );
    const realHealValue = Math.min(healValue, this.hp - this.currHP);

    const data: IHealedEventData = {
      type: BattleEventType.HEALED,
      source,
      target: this,
      healValue,
      realHealValue,
    };

    await this.battle.dispatch(BattleEventType.HEALED, data);

    // this.currHP += realHealValue;
  }
}
