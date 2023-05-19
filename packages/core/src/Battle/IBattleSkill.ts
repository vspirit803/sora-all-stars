import { type IBattleObject } from "./IBattleObject";

export interface IBattleSkill {
  id: string;
  name: string;
  owner: IBattleObject;
  cast: SkillCast;
  getPriority: GetSkillPriority;
  getTarget: GetSkillTarget;
}

export type SkillCast = (this: IBattleSkill, target: IBattleObject) => Promise<void>;
export type GetSkillPriority = (this: IBattleSkill) => number;
export type GetSkillTarget = (this: IBattleSkill) => IBattleObject;
