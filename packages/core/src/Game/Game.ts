import { type ISerialize } from "@core/base";
import { Character, CharacterConfigManager } from "@core/Character";
import { type Item, ItemConfigManager, ItemFactory, MaterialItemConfig } from "@core/Item";
import { InitSave, MaterialsConfig } from "@sora-all-stars/assets";
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

import packageJson from "../../package.json";
import { GameSave } from "./GameSave";
import { type IBattleObject, IBattleObjectDefault } from "./IBattleObject";

export class Game implements ISerialize<GameSave>, IBattleObject {
  version: string;
  startTime: Date;
  lastSaveTime?: Date;
  loadTime: Date;
  characters: Character[];
  characterMap: Map<string, Character>;
  items: Item[];

  private constructor() {
    this.version = packageJson.version;
    this.startTime = new Date();
    this.loadTime = new Date();
    this.characters = [];
    this.characterMap = new Map();
    this.items = [];
  }

  onBattleStart = IBattleObjectDefault.onBattleStart.bind(this);
  onBattleEnd = IBattleObjectDefault.onBattleEnd.bind(this);

  loadSave(rawSave: unknown) {
    const save = plainToInstance(GameSave, rawSave);
    const errors = validateSync(save);

    if (errors.length > 0) {
      console.log(errors);
      throw new Error("Invalid save");
    }

    // console.log(save);

    this.version = save.version;
    this.startTime = new Date(save.startTime);
    this.lastSaveTime = save.lastSaveTime
      ? new Date(save.lastSaveTime)
      : undefined;

    this.characters = save.characters.map((eachCharacterSave) => {
      const characterName = eachCharacterSave.id;
      const characterConfig = CharacterConfigManager.getCharacterConfig(characterName);

      if (!characterConfig) {
        throw new Error(`Invalid character name: ${characterName}`);
      }

      const newCharacter = new Character(characterConfig);
      newCharacter.loadSave(eachCharacterSave);

      return newCharacter;
    });
    this.characters.forEach((character) => {
      this.characterMap.set(character.id, character);
    });

    this.items = save.items.map((eachItemSave) => ItemFactory.getItemFromSave(eachItemSave));
  }

  generateSave(): GameSave {
    return {
      version: this.version,
      startTime: this.startTime.toISOString(),
      lastSaveTime: new Date().toISOString(),
      characters: this.characters.map((character) => character.generateSave()),
      items: this.items.map((item) => item.generateSave()),
    };
  }

  getSaveStr(): string {
    return JSON.stringify(this.generateSave());
  }

  init() {
    this.loadSave(InitSave);
    this.startTime = new Date();
  }

  static #instance: Game;

  static get instance(): Game {
    if (!Game.#instance) {
      Game.validateAssets();
      ItemConfigManager.init();
      CharacterConfigManager.init();

      Game.#instance = new Game();
    }

    return Game.#instance;
  }

  static validateAssets() {
    const rawMaterials = MaterialsConfig;

    const materialsConfig = plainToInstance(MaterialItemConfig, rawMaterials);

    materialsConfig.forEach((material) => {
      const errors = validateSync(material);

      if (errors.length > 0) {
        console.log(errors);
        throw new Error("Invalid material");
      }
    });
  }
}
