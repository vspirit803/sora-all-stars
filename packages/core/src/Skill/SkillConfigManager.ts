import { SkillsConfig } from "@sora-all-stars/assets";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";

import { SkillConfig } from "./SkillConfig";

export class SkillConfigManager {
  static skillConfigMap: Map<string, SkillConfig> = new Map();

  static getSkill(id: string): SkillConfig | null {
    return SkillConfigManager.skillConfigMap.get(id) ?? null;
  }

  static init() {
    SkillConfigManager.initSkills();
  }

  static initSkills() {
    for (const config of SkillsConfig) {
      const currConfig = plainToClass(SkillConfig, config);
      const errors = validateSync(currConfig);

      if (errors.length > 0) {
        console.log(errors);
        throw new Error("Invalid skill config");
      }

      SkillConfigManager.skillConfigMap.set(currConfig.id, currConfig);
    }
  }
}
