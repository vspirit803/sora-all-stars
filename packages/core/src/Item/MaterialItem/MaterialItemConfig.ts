import { Equals, IsNumberString, Length, Matches } from "class-validator";

import { ItemConfig } from "../ItemConfig";
import { ItemType } from "../ItemType";

export type MaterialItemId = `1${number}`;

export class MaterialItemConfig extends ItemConfig {
  @Length(6, 6)
  @IsNumberString({ no_symbols: true })
  @Matches(/^1[0-9]{5}$/)
  declare id: MaterialItemId;

  @Equals(ItemType.Material)
  override type: ItemType.Material = ItemType.Material;
}
