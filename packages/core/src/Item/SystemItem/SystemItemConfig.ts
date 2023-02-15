import { Equals, IsNumberString, Length, Matches } from "class-validator";

import { ItemConfig } from "../ItemConfig";
import { ItemType } from "../ItemType";

export type SystemItemId = `0${number}`;

export class SystemItemConfig extends ItemConfig {
  @Length(6, 6)
  @IsNumberString({ no_symbols: true })
  @Matches(/^0[0-9]{5}$/)
  declare id: SystemItemId;

  @Equals(ItemType.System)
  override type: ItemType.System = ItemType.System;
}
