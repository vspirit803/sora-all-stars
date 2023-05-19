export enum BattleEventType {
  // Battle
  BATTLE_START = "BATTLE_START", // 战斗开始
  BATTLE_END = "BATTLE_END", // 战斗结束
  // Turn
  TURN_START = "TURN_START", // 回合开始
  TURN_END = "TURN_END", // 回合结束
  // Action
  ACTION_START = "ACTION_START", // 行动开始
  ACTION_END = "ACTION_END", // 行动结束
  // Skill
  SKILL_CAST = "SKILL_CAST", // 技能释放
  SKILL_CASTED = "SKILL_CASTED", // 受到技能释放

  // BattleObject
  DAMAGE = "DAMAGE", // 战斗对象造成伤害
  DAMAGED = "DAMAGED", // 战斗对象受到伤害
  HEAL = "HEAL", // 战斗对象造成治疗
  HEALED = "HEALED", // 战斗对象受到治疗
  KILL = "KILL", // 战斗对象击杀
  KILLED = "KILLED", // 战斗对象被击杀
  DEAD = "DEAD", // 战斗对象死亡
}
