import { type ISerialize } from "@core/base";

import { Item } from "../Item";
import { ItemType } from "../ItemType";
import { type MaterialItemConfig } from "./MaterialItemConfig";
import { type MaterialItemSave } from "./MaterialItemSave";

export class MaterialItem extends Item implements ISerialize<MaterialItemSave> {
  override type: ItemType.Material = ItemType.Material;
  count: number;

  constructor(config: MaterialItemConfig) {
    super(config);
    this.count = 1;
  }

  override loadSave(save: MaterialItemSave): void {
    super.loadSave(save);
    this.count = save.count;
  }

  override generateSave(): MaterialItemSave {
    return {
      ...super.generateSave(),
      type: this.type,
      count: this.count,
    };
  }
}
