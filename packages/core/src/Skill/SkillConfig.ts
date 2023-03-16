import { IsNumberString, IsString } from "class-validator";

export class SkillConfig {
  @IsNumberString({ no_symbols: true })
  id!: string;

  @IsString()
  name!: string;
}
