import { Transform, Type } from "class-transformer";
import { IsNumber, IsNumberString, IsString, Length, ValidateNested } from "class-validator";

export class CharacterSinglePropertyConfig {
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsNumber()
  base!: number;

  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsNumber()
  growth!: number;
}

export class CharacterPropertyConfig {
  @ValidateNested()
  @Type(() => CharacterSinglePropertyConfig)
  ATK!: CharacterSinglePropertyConfig;

  @ValidateNested()
  @Type(() => CharacterSinglePropertyConfig)
  DEF!: CharacterSinglePropertyConfig;

  @ValidateNested()
  @Type(() => CharacterSinglePropertyConfig)
  HP!: CharacterSinglePropertyConfig;

  @ValidateNested()
  @Type(() => CharacterSinglePropertyConfig)
  MP!: CharacterSinglePropertyConfig;

  @ValidateNested()
  @Type(() => CharacterSinglePropertyConfig)
  SPD!: CharacterSinglePropertyConfig;
}

export class CharacterConfig {
  @Length(6, 6)
  @IsNumberString({ no_symbols: true })
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  gender!: string;

  @IsString()
  source!: string;

  @IsString()
  description!: string;

  @ValidateNested()
  @Type(() => CharacterPropertyConfig)
  properties!: CharacterPropertyConfig;
}
