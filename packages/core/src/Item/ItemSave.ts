import { IsString } from "class-validator";

import { type ItemType } from "./ItemType";

export class ItemSave {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsString()
  type!: ItemType;
}