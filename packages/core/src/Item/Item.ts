import { type ISerialize } from "@core/base";

import { type ItemSave } from "./ItemSave";
import { ItemType } from "./ItemType";

export abstract class Item implements ISerialize<ItemSave> {
  name: string;
  type: ItemType;
  description: string;

  constructor() {
    this.name = "";
    this.description = "";
    this.type = ItemType.System;
  }

  loadSave(save: ItemSave): void {
    this.name = save.name;
    this.description = save.description;
    this.type = save.type;
  }

  generateSave(): ItemSave {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
    };
  }

  getSaveStr(): string {
    return JSON.stringify(this.generateSave());
  }
}