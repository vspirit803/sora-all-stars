import { IsString } from "class-validator";

import { ItemSave } from "./ItemSave";
import { ItemType } from "./ItemType";

export class MaterialItemSave extends ItemSave {
  @IsString()
  override type: ItemType.Material = ItemType.Material;
}