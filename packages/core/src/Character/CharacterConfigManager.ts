import { CharactersConfig } from "@sora-all-stars/assets";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";

import { CharacterConfig } from "./CharacterConfig";

export class CharacterConfigManager {
  static characterConfigMap: Map<string, CharacterConfig> = new Map();

  static getCharacterConfig(id: string): CharacterConfig | null {
    return CharacterConfigManager.characterConfigMap.get(id) ?? null;
  }

  static init() {
    CharacterConfigManager.initCharacterConfigs();
  }

  static initCharacterConfigs() {
    for (const config of CharactersConfig) {
      const currConfig = plainToClass(CharacterConfig, config);
      const errors = validateSync(currConfig);

      if (errors.length > 0) {
        console.log(errors);
        throw new Error("Invalid character config");
      }

      CharacterConfigManager.characterConfigMap.set(currConfig.id, currConfig);
    }
  }
}
