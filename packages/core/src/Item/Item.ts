import { type ISerialize } from "@core/base";
import { type Rarity } from "@core/Rarity";

import { type ItemConfig } from "./ItemConfig";
import { type ItemSave } from "./ItemSave";
import { ItemType } from "./ItemType";

export abstract class Item implements ISerialize<ItemSave> {
  id: string;
  name: string;
  type: ItemType;
  description: string;
  rarity: Rarity;

  constructor(config: ItemConfig) {
    this.id = config.id;
    this.type = ItemType.System;
    this.rarity = config.rarity;
    this.name = config.name;
    this.description = config.description;
  }

  loadSave(save: ItemSave): void {
    this.id = save.id;
    this.type = save.type;
  }

  generateSave(): ItemSave {
    return {
      id: this.id,
      type: this.type,
    };
  }

  getSaveStr(): string {
    return JSON.stringify(this.generateSave());
  }
}
