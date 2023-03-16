import { type ISerialize } from "@core/base";

import { type SkillConfig } from "./SkillConfig";
import { type SkillSave } from "./SkillSave";

export class Skill implements ISerialize<SkillSave> {
  id: string;
  name: string;

  constructor(skillConfig: SkillConfig) {
    this.id = skillConfig.id;
    this.name = skillConfig.name;
  }

  loadSave(save: SkillSave): void {
    // Do nothing.
  }

  generateSave(): SkillSave {
    return {
      id: this.id,
    };
  }

  getSaveStr(): string {
    return JSON.stringify(this.generateSave());
  }
}
