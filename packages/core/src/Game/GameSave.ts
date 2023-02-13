import { CharacterSave } from "@core/Character";
import { ItemSave } from "@core/Item";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsSemVer,
  ValidateNested,
} from "class-validator";

export class GameSave {
  @IsSemVer()
  version!: string;

  @IsDateString()
  startTime!: string;

  @IsOptional()
  @IsDateString()
  lastSaveTime?: string;

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => CharacterSave)
  characters!: CharacterSave[];

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => ItemSave)
  items!: ItemSave[];
}
