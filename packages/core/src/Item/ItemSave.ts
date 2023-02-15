import { IsEnum, IsNumberString, Length } from "class-validator";

import { ItemType } from "./ItemType";

export class ItemSave {
  @Length(6, 6)
  @IsNumberString({ no_symbols: true })
  id!: string;

  @IsEnum(ItemType)
  type!: ItemType;
}
