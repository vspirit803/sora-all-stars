import { type ISerialize } from "@core/base";

import { Item } from "../Item";
import { ItemType } from "../ItemType";
import { type EquipmentItemConfig } from "./EquipmentItemConfig";
import { type EquipmentItemSave } from "./EquipmentItemSave";
import { type EquipmentType } from "./EquipmentType";

export class EquipmentItem extends Item implements ISerialize<EquipmentItemSave> {
  override type: ItemType.Equipment = ItemType.Equipment;
  equipmentType: EquipmentType;
  uuid: string;
  createTime: Date;

  constructor(config: EquipmentItemConfig) {
    super(config);
    this.equipmentType = config.equipmentType;
    this.uuid = crypto.randomUUID();
    this.createTime = new Date();
  }

  override loadSave(save: EquipmentItemSave): void {
    super.loadSave(save);
    this.uuid = save.uuid;
    this.createTime = new Date(save.createTime);
  }

  override generateSave(): EquipmentItemSave {
    return {
      ...super.generateSave(),
      type: this.type,
      uuid: this.uuid,
      createTime: this.createTime.toISOString(),
    };
  }
}
