import { type ISerialize } from "@core/base";

import { Item } from "..";
import { ItemType } from "../ItemType";
import { type SystemItemConfig } from "./SystemItemConfig";
import { type SystemItemSave } from "./SystemItemSave";

export class SystemItem extends Item implements ISerialize<SystemItemSave> {
  override type: ItemType.System;

  constructor(config: SystemItemConfig) {
    super(config);
    this.type = ItemType.System;
  }

  override loadSave(save: SystemItemSave): void {
    super.loadSave(save);
  }

  override generateSave(): SystemItemSave {
    return {
      ...super.generateSave(),
      type: this.type,
    };
  }
}
