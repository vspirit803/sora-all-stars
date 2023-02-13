import { type ISerialize } from "@core/base";

import { Item } from "./Item";
import { ItemType } from "./ItemType";
import { type MaterialItemSave } from "./MaterialItemSave";

export class MaterialItem extends Item implements ISerialize<MaterialItemSave> {
  override type: ItemType.Material;

  constructor() {
    super();
    this.type = ItemType.Material;
  }

  override loadSave(save: MaterialItemSave): void {
    super.loadSave(save);
  }

  override generateSave(): MaterialItemSave {
    return {
      ...super.generateSave(),
      type: this.type,
    };
  }
}