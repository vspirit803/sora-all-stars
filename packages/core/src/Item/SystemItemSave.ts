import { IsString } from "class-validator";

import { ItemSave } from "./ItemSave";
import { ItemType } from "./ItemType";

export class SystemItemSave extends ItemSave {
  @IsString()
  override type: ItemType.System = ItemType.System;
}