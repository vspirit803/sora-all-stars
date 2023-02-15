import { type ClassConstructor, plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

import { EquipmentItem, type EquipmentItemId, EquipmentItemSave } from "./EquipmentItem";
import { type Item } from "./Item";
import { ItemConfigManager } from "./ItemConfigManager";
import { type ItemSave } from "./ItemSave";
import { ItemType } from "./ItemType";
import { MaterialItem, type MaterialItemId, MaterialItemSave } from "./MaterialItem";
import { SystemItem, SystemItemSave } from "./SystemItem";

export class ItemFactory {
  static getItemFromSave(save: ItemSave): Item {
    switch (save.type) {
    case ItemType.Material:
      return ItemFactory.getMaterialItemFromSave(ItemFactory.getTypedSave(MaterialItemSave, save));
    case ItemType.System:
      return ItemFactory.getSystemItemFromSave(ItemFactory.getTypedSave(SystemItemSave, save));
    case ItemType.Equipment:
      return ItemFactory.getEquipmentItemFromSave(ItemFactory.getTypedSave(EquipmentItemSave, save));
    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Invalid item type: ${save.type}`);
    }
  }

  static getItem(id: MaterialItemId | EquipmentItemId): Item {
    switch (id[0]) {
    case "1": {
      const materialConfig = ItemConfigManager.getMaterialItemConfig(id);

      if (!materialConfig) {
        throw new Error(`Invalid material item id: ${id}`);
      }

      return new MaterialItem(materialConfig);

    }
    case "2": {
      const equipmentConfig = ItemConfigManager.getEquipmentItemConfig(id);

      if (!equipmentConfig) {
        throw new Error(`Invalid equipment item id: ${id}`);
      }

      return new EquipmentItem(equipmentConfig);
    }
    default:
      throw new Error(`Invalid item id: ${id}`);
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

  static getMaterialItemFromSave(save: MaterialItemSave): MaterialItem {
    const materialConfig = ItemConfigManager.getMaterialItemConfig(save.id);

    if (!materialConfig) {
      throw new Error(`Invalid material item id: ${save.id}`);
    }

    const item = new MaterialItem(materialConfig);
    item.loadSave(save);
    return item;
  }

  static getSystemItemFromSave(save: SystemItemSave): SystemItem {
    const systemItemConfig = ItemConfigManager.getSystemItemConfig(save.id);

    if (!systemItemConfig) {
      throw new Error(`Invalid system item id: ${save.id}`);
    }

    const item = new SystemItem(systemItemConfig);
    item.loadSave(save);
    return item;
  }

  static getEquipmentItemFromSave(save: EquipmentItemSave): EquipmentItem {
    const equipmentItemConfig = ItemConfigManager.getEquipmentItemConfig(save.id);

    if (!equipmentItemConfig) {
      throw new Error(`Invalid equipment item id: ${save.id}`);
    }

    const item = new EquipmentItem(equipmentItemConfig);
    item.loadSave(save);
    return item;
  }
}
