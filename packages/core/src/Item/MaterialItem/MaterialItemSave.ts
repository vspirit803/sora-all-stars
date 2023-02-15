import { Equals, IsPositive } from "class-validator";

import { ItemSave } from "../ItemSave";
import { ItemType } from "../ItemType";

export class MaterialItemSave extends ItemSave {
  @Equals(ItemType.Material)
  override type: ItemType.Material = ItemType.Material;

  @IsPositive()
  count!: number;
}
