import { CharacterSave } from "@core/Character";
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
  characters!: Array<CharacterSave>;
}
