import { ISerialize } from "@core/base";
import { Character } from "@core/Character";
import { characters, initSave } from "@sora-all-stars/assets";
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

import packageJson from "../../package.json";
import { GameSave } from "./GameSave";

export class Game implements ISerialize<GameSave> {
  version: string;
  startTime: Date;
  lastSaveTime?: Date;
  loadTime: Date;
  characters: Array<Character>;

  private constructor() {
    this.version = packageJson.version;
    this.startTime = new Date();
    this.loadTime = new Date();
    this.characters = [];
  }

  loadSave(rawSave: unknown) {
    // console.log(rawSave);
    // console.log("transform to Class...");

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
      const characterName = eachCharacterSave.name;
      const characterConfig = characters.find((character) => character.name === characterName);

      if (!characterConfig) {
        throw new Error(`Invalid character name: ${characterName}`);
      }

      const newCharacter = new Character(characterConfig);
      newCharacter.loadSave(eachCharacterSave);

      return newCharacter;
    });
  }

  generateSave() {
    return {
      version: this.version,
      startTime: this.startTime.toISOString(),
      lastSaveTime: new Date().toISOString(),
      characters: this.characters.map((character) => character.generateSave()),
    };
  }

  getSaveStr(): string {
    return JSON.stringify(this.generateSave());
  }

  init() {
    this.loadSave(initSave);
    this.startTime = new Date();
  }

  static #instance: Game;

  static get instance(): Game {
    if (!Game.#instance) {
      Game.#instance = new Game();
    }

    return Game.#instance;
  }
}
