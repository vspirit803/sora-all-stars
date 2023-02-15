import { Equals, IsDateString, IsUUID } from "class-validator";

import { ItemSave } from "../ItemSave";
import { ItemType } from "../ItemType";

export class EquipmentItemSave extends ItemSave {
  @Equals(ItemType.Equipment)
  override type: ItemType.Equipment = ItemType.Equipment;

  @IsUUID()
  uuid!: string;

  @IsDateString()
  createTime!: string;
}
