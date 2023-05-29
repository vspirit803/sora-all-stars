import { Rarity } from "@core/Rarity";
import { IsEnum, IsNumberString, IsString, Length } from "class-validator";

import { ItemType } from "./ItemType";

export type ItemId = string;
export class ItemConfig {
  @Length(6, 6)
  @IsNumberString({ no_symbols: true })
  id!: ItemId;

  @IsEnum(ItemType)
  type!: ItemType;

  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsEnum(Rarity)
  rarity!: Rarity;
}
