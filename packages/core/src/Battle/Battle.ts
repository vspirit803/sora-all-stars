import { BattleCharacter } from "./BattleCharacter";
import {
  BattleEventType,
  type IActionEndEventData,
  type IBattleEventData,
  type IBattleEventListener,
  type IDamagedEventData,
  type IDamageEventData,
  type IHealedEventData,
  type IHealEventData,
  type ISkillCastedEventData,
  type ISkillCastEventData,
  type ITurnEndEventData,
  type ITurnStartEventData,
} from "./BattleEvent";
import { type IActionStartEventData } from "./BattleEvent/ActionStartEvent";
import { BattleSkill } from "./BattleSkill";
import { type IBattleObject } from "./IBattleObject";
import { type IBattleSkill, type SkillCast } from "./IBattleSkill";
import { SkillCasts } from "./SkillCasts";

export type BattleTeam = IBattleObject[];

export enum BattleResult {
  WIN,
  LOSE,
  CANCEL,
}

export class Battle {
  name: string;
  teams: [BattleTeam, BattleTeam];

  turn: number;
  thisTurn: IBattleObject[];
  listeners: IBattleEventListener[];

  #canceled: boolean;

  constructor() {
    this.name = "";
    this.teams = [[], []];

    this.turn = 0;
    this.thisTurn = [];
    this.listeners = [];

    this.#canceled = false;
  }

  isFinished(): boolean {
    return this.teams.some(team => team.every(obj => obj.isDead));
  }

  async execute() {
    while (!this.isFinished() && !this.#canceled) {
      const character: IBattleObject = await this.getNextActionObject();

      await this.dispatch(BattleEventType.ACTION_START, {
        type: BattleEventType.ACTION_START,
        target: character,
      });

      const availableSkills = character.skills;
      const skill = availableSkills.reduce((prev, curr) => curr.getPriority() > prev.getPriority() ? curr : prev);
      const target = skill.getTarget();
      await skill.cast(target);

      await this.dispatch(BattleEventType.ACTION_END, {
        type: BattleEventType.ACTION_END,
        target: character,
      });
    }

    if (this.#canceled) {
      return BattleResult.CANCEL;
    }

    if (this.teams[0].every(obj => obj.isDead)) {
      return BattleResult.LOSE;
    }

    return BattleResult.WIN;
  }

  cancel() {
    this.#canceled = true;
  }

  async getNextActionObject(): Promise<IBattleObject> {
    if (this.thisTurn.length === 0) {
      this.thisTurn = this.teams
        .flatMap(team => team)
        .filter(obj => obj.isAlive)
        .sort((a, b) => b.spd - a.spd);

      if (this.turn > 0) {
        await this.dispatch( BattleEventType.TURN_END, { type: BattleEventType.TURN_END, turn: this.turn });
      }

      this.turn += 1;
      await this.dispatch( BattleEventType.TURN_START, { type: BattleEventType.TURN_START, turn: this.turn });
    }

    const curr = this.thisTurn.shift();

    if (!curr) {
      throw new Error("No action object in this turn.");
    }

    if (curr.isDead) {
      return this.getNextActionObject();
    }

    return curr;
  }

  static generateBattle() {
    const battle = new Battle();

    battle.name = "桶狭间之战";
    const team1: BattleTeam = [];
    const team2: BattleTeam = [];
    const 织田信长 = new BattleCharacter(battle, team1);
    织田信长.id = "000001";
    织田信长.name = "织田信长";
    织田信长.hp = 1000;
    织田信长.currHP = 1000;
    织田信长.atk = 110;
    织田信长.def = 30;
    织田信长.spd = 100;
    织田信长.critRate = 0.2;
    织田信长.critDmg = 1.8;
    const 斩击 = new BattleSkill("000001", "斩击", 织田信长, SkillCasts.斩击.cast, SkillCasts.斩击.getPriority);
    织田信长.skills.push(斩击);

    const 羽柴秀吉 = new BattleCharacter(battle, team1);
    羽柴秀吉.id = "000015";
    羽柴秀吉.name = "丰臣秀吉";
    羽柴秀吉.hp = 1000;
    羽柴秀吉.currHP = 1000;
    羽柴秀吉.atk = 100;
    羽柴秀吉.def = 20;
    羽柴秀吉.spd = 120;
    羽柴秀吉.critRate = 0.1;
    羽柴秀吉.critDmg = 1.5;
    羽柴秀吉.skills.push(this.generateSkill(羽柴秀吉));

    const 德川家康 = new BattleCharacter(battle, team1);
    德川家康.id = "000016";
    德川家康.name = "德川家康";
    德川家康.hp = 1500;
    德川家康.currHP = 1500;
    德川家康.atk = 80;
    德川家康.def = 80;
    德川家康.spd = 80;
    德川家康.critRate = 0.05;
    德川家康.critDmg = 1.2;
    德川家康.skills.push(this.generateSkill(德川家康));
    const 推气过宫 = new BattleSkill("000002", "推气过宫", 德川家康, SkillCasts.推气过宫.cast, SkillCasts.推气过宫.getPriority, SkillCasts.推气过宫.getTarget);
    德川家康.skills.push(推气过宫);

    const 钟离 = new BattleCharacter(battle, team1);
    钟离.id = "000005";
    钟离.name = "钟离";
    钟离.hp = 2000;
    钟离.currHP = 2000;
    钟离.atk = 150;
    钟离.def = 100;
    钟离.spd = 100;
    钟离.critRate = 0.05;
    钟离.critDmg = 1.2;
    钟离.skills.push(this.generateSkill(钟离));

    battle.listen(BattleEventType.DAMAGED, async(data) => {
      if (data.target !== 钟离) {
        return;
      }

      const source = data.source;
      await source.attacked(data.target);
    });

    const 雷电将军 = new BattleCharacter(battle, team1);
    雷电将军.id = "000006";
    雷电将军.name = "雷电将军";
    雷电将军.hp = 1200;
    雷电将军.currHP = 1000;
    雷电将军.atk = 180;
    雷电将军.def = 50;
    雷电将军.spd = 100;
    雷电将军.critRate = 0.15;
    雷电将军.critDmg = 1.8;
    const 无想的一刀 = new BattleSkill("000003", "无想的一刀", 雷电将军, SkillCasts.无想的一刀.cast, SkillCasts.无想的一刀.getPriority);
    雷电将军.skills.push(this.generateSkill(雷电将军), 无想的一刀);

    const 斧王1 = new BattleCharacter(battle, team2);
    斧王1.id = "000002";
    斧王1.name = "斧王1";
    斧王1.hp = 1000;
    斧王1.currHP = 1000;
    斧王1.atk = 150;
    斧王1.def = 50;
    斧王1.spd = 80;
    斧王1.critRate = 0.05;
    斧王1.critDmg = 1.5;
    斧王1.skills.push(this.generateSkill(斧王1));

    const 斧王2 = new BattleCharacter(battle, team2);
    斧王2.id = "000002";
    斧王2.name = "斧王2";
    斧王2.hp = 1500;
    斧王2.currHP = 1500;
    斧王2.atk = 150;
    斧王2.def = 50;
    斧王2.spd = 80;
    斧王2.critRate = 0.05;
    斧王2.critDmg = 1.5;
    斧王2.skills.push(this.generateSkill(斧王2));

    const 斧王3 = new BattleCharacter(battle, team2);
    斧王3.id = "000002";
    斧王3.name = "斧王3";
    斧王3.hp = 2000;
    斧王3.currHP = 2000;
    斧王3.atk = 200;
    斧王3.def = 50;
    斧王3.spd = 80;
    斧王3.critRate = 0.05;
    斧王3.critDmg = 1.5;
    斧王3.skills.push(this.generateSkill(斧王3));

    const 斧王4 = new BattleCharacter(battle, team2);
    斧王4.id = "000002";
    斧王4.name = "斧王4";
    斧王4.hp = 2500;
    斧王4.currHP = 2500;
    斧王4.atk = 250;
    斧王4.def = 50;
    斧王4.spd = 80;
    斧王4.critRate = 0.05;
    斧王4.critDmg = 1.5;
    斧王4.skills.push(this.generateSkill(斧王4));

    const 斧王5 = new BattleCharacter(battle, team2);
    斧王5.id = "000002";
    斧王5.name = "斧王5";
    斧王5.hp = 3000;
    斧王5.currHP = 3000;
    斧王5.atk = 300;
    斧王5.def = 50;
    斧王5.spd = 80;
    斧王5.critRate = 0.05;
    斧王5.critDmg = 1.5;
    斧王5.skills.push(this.generateSkill(斧王5));

    team1.push(织田信长, 羽柴秀吉, 德川家康, 钟离, 雷电将军);
    team2.push(斧王1, 斧王2, 斧王3, 斧王4, 斧王5);

    battle.teams = [team1, team2];

    // battle.listen(BattleEventType.SKILL_CAST, )

    return battle;
  }

  static generateSkill(owner: IBattleObject, cast: SkillCast = SkillCasts.斩击.cast): IBattleSkill {
    const skill = new BattleSkill("000001", "斩击", owner);
    skill.cast = cast.bind(skill);
    return skill;
  }

  listen(eventType: BattleEventType.TURN_START, handler: (data: ITurnStartEventData) => Promise<void> | void): void;
  listen(eventType: BattleEventType.TURN_END, handler: (data: ITurnEndEventData) => Promise<void> | void): void;
  listen(eventType: BattleEventType.ACTION_START, handler: (data: IActionStartEventData) => Promise<void> | void): void;
  listen(eventType: BattleEventType.ACTION_END, handler: (data: IActionEndEventData) => Promise<void> | void): void;
  listen(eventType: BattleEventType.SKILL_CAST, handler: (data: ISkillCastEventData) => Promise<void> | void): void;
  listen(eventType: BattleEventType.SKILL_CASTED, handler: (data: ISkillCastedEventData) => Promise<void> | void): void;
  listen(eventType: BattleEventType.DAMAGE, handler: (data: IDamageEventData) => Promise<void> | void): void;
  listen(eventType: BattleEventType.DAMAGED, handler: (data: IDamagedEventData) => Promise<void> | void): void;
  listen(eventType: BattleEventType.HEAL, handler: (data: IHealEventData) => Promise<void> | void): void;
  listen(eventType: BattleEventType.HEALED, handler: (data: IHealedEventData) => Promise<void> | void): void;
  listen(eventType: BattleEventType, handler: (data: any) => Promise<void> | void) {
    this.listeners.push({ eventType, handler });
  }

  async dispatch(eventType: BattleEventType.TURN_START, data: ITurnStartEventData): Promise<void>;
  async dispatch(eventType: BattleEventType.TURN_END, data: ITurnEndEventData): Promise<void>;
  async dispatch(eventType: BattleEventType.ACTION_START, data: IActionStartEventData): Promise<void>;
  async dispatch(eventType: BattleEventType.ACTION_END, data: IActionEndEventData): Promise<void>;
  async dispatch(eventType: BattleEventType.SKILL_CAST, data: ISkillCastEventData): Promise<void>;
  async dispatch(eventType: BattleEventType.SKILL_CASTED, data: ISkillCastedEventData): Promise<void>;
  async dispatch(eventType: BattleEventType.DAMAGE, data: IDamageEventData): Promise<void>;
  async dispatch(eventType: BattleEventType.DAMAGED, data: IDamagedEventData): Promise<void>;
  async dispatch(eventType: BattleEventType.HEAL, data: IHealEventData): Promise<void>;
  async dispatch(eventType: BattleEventType.HEALED, data: IHealedEventData): Promise<void>;
  async dispatch(eventType: BattleEventType, data: IBattleEventData): Promise<void> {
    const listeners = this.listeners.filter(listener => listener.eventType === eventType);

    for await (const listener of listeners) {
      await listener.handler(data);
    }
  }
}
