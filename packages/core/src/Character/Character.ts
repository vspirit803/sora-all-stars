import { ISerialize } from "@core/base";
import { Property, PropertyName } from "@core/Property";

import { CharacterConfig } from "./CharacterConfig";
import { CharacterSave } from "./CharacterSave";

export class Character implements ISerialize<CharacterSave> {
  name: string;
  properties: Record<PropertyName, Property>;
  config: CharacterConfig;

  constructor(characterConfig: CharacterConfig) {
    this.name = characterConfig.name;
    this.properties = Object.fromEntries(
      Object.entries(characterConfig.properties).map(([name, value]) => {
        const property = new Property();
        property.name = name as PropertyName;
        property.value = value;
        return [name, property];
      })
    ) as Record<PropertyName, Property>;
    this.config = characterConfig;
  }

  loadSave(save: CharacterSave): void {
    this.name = save.name;

    for (const propertyName in save.properties) {
      const property = new Property();
      property.loadSave(save.properties[propertyName as PropertyName]);

      this.properties[propertyName as PropertyName] = property;
    }
  }

  generateSave(): CharacterSave {
    return {
      name: this.name,
      properties: Object.fromEntries(
        Object.entries(this.properties).map(([name, property]) => [
          name,
          property.generateSave(),
        ])
      ) as Record<PropertyName, Property>,
    };
  }

  getSaveStr(): string {
    return JSON.stringify(this.generateSave());
  }

  get ATK(): number {
    return this.properties.ATK.value;
  }

  get DEF(): number {
    return this.properties.DEF.value;
  }

  get HP(): number {
    return this.properties.HP.value;
  }

  get MP(): number {
    return this.properties.MP.value;
  }

  get SPD(): number {
    return this.properties.SPD.value;
  }
}
