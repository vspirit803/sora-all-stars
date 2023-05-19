import { type Battle, type BattleTeam } from "./Battle";
import { BattleEventType, type IHealedEventData } from "./BattleEvent";
import { type IBattleObject, IBattleObjectDefaultImplement } from "./IBattleObject";
import { type IBattleSkill } from "./IBattleSkill";

export class BattleCharacter implements IBattleObject {
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

  attack: typeof IBattleObjectDefaultImplement.attack = IBattleObjectDefaultImplement.attack.bind(this);
  attacked: typeof IBattleObjectDefaultImplement.attacked = IBattleObjectDefaultImplement.attacked.bind(this);
  heal: typeof IBattleObjectDefaultImplement.heal = IBattleObjectDefaultImplement.heal.bind(this);
  healed: typeof IBattleObjectDefaultImplement.healed = IBattleObjectDefaultImplement.healed.bind(this);

  constructor(battle: Battle, team: BattleTeam) {
    this.battle = battle;
    this.team = team;

    this.id = "";
    this.name = "";
    this.uuid = Math.random().toString(36).slice(2).padStart(8, "0");

    this.atk = 0;
    this.def = 0;
    this.hp = 0;
    this.mp = 0;
    this.spd = 0;
    this.critRate = 0;
    this.critDmg = 0;

    this.currHP = 0;
    this.currMP = 0;

    this.isStunned = false;
    this.isSilenced = false;

    this.skills = [];

    battle.listen(BattleEventType.HEALED, this.onHealed.bind(this));
  }

  get isDead() {
    return this.currHP <= 0;
  }

  get isAlive() {
    return !this.isDead;
  }

  getTarget(): IBattleObject {
    const team = this.battle.teams.find(team => team !== this.team);

    if (!team) {
      throw new Error("No target team.");
    }

    const availableTargets = team.filter(obj => obj.isAlive);

    const target = availableTargets[Math.floor(Math.random() * availableTargets.length)];

    if (!target) {
      throw new Error("No target.");
    }

    return target;
  }

  onHealed(data: IHealedEventData) {
    if (data.target !== this) {
      return;
    }

    const { source, target, isCrit, healValue } = data;

    const realHealValue = Math.min(healValue, this.hp - this.currHP);
    data.realHealValue = realHealValue;

    // console.log(`${source.name} 对 ${target.name} 造成了 ${realHealValue} 点${isCrit ? "暴击" : ""}治疗`);
    this.currHP += realHealValue;
  }
}
