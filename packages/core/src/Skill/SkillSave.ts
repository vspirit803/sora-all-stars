import { IsNumberString } from "class-validator";

export class SkillSave {
  @IsNumberString({ no_symbols: true })
  id!: string;
}
