import { type ClassConstructor, plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

import { type Item } from "./Item";
import { type ItemSave } from "./ItemSave";
import { ItemType } from "./ItemType";
import { MaterialItem } from "./MaterialItem";
import { MaterialItemSave } from "./MaterialItemSave";
import { SystemItem } from "./SystemItem";
import { SystemItemSave } from "./SystemItemSave";

export class ItemFactory {
  static getItem(save: ItemSave): Item {
    switch (save.type) {
    case ItemType.Material:
      return ItemFactory.getMaterialItem(ItemFactory.getTypedSave(MaterialItemSave, save));
    case ItemType.System:
      return ItemFactory.getSystemItem(ItemFactory.getTypedSave(SystemItemSave, save));
    case ItemType.Equipment:
      throw new Error("Equipment items are not implemented yet");
    // default:
    //   throw new Error(`Invalid item type: ${save.type}`);
    }
  }

  static getTypedSave<T extends ItemSave>(cls: ClassConstructor<T>, save: ItemSave) {
    const typedSave = plainToInstance(cls, save);
    const errors = validateSync(typedSave);

    if (errors.length > 0) {
      console.log(errors);
      throw new Error("Invalid save");
    }

    return typedSave;
  }

  static getMaterialItem(save: MaterialItemSave): MaterialItem {
    const item = new MaterialItem();
    item.loadSave(save);
    return item;
  }

  static getSystemItem(save: SystemItemSave): SystemItem {
    const item = new SystemItem();
    item.loadSave(save);
    return item;
  }
}