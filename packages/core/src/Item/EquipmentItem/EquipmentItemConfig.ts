import { Transform, Type } from "class-transformer";
import { Equals, IsEnum, IsNumber, IsNumberString, Length, Matches, ValidateNested } from "class-validator";

import { ItemConfig } from "../ItemConfig";
import { ItemType } from "../ItemType";
import { EquipmentType } from "./EquipmentType";

class EquipmentPropertyConfig {
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsNumber()
  ATK!: number;

  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsNumber()
  DEF!: number;

  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsNumber()
  HP!: number;

  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsNumber()
  MP!: number;

  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsNumber()
  SPD!: number;
}

export type EquipmentItemId = `2${number}`;

export class EquipmentItemConfig extends ItemConfig {
  @Length(6, 6)
  @IsNumberString({ no_symbols: true })
  @Matches(/^2[0-9]{5}$/)
  declare id: EquipmentItemId;

  @Equals(ItemType.Equipment)
  override type: ItemType.Equipment = ItemType.Equipment;

  @IsEnum(EquipmentType)
  equipmentType!: EquipmentType;

  @ValidateNested()
  @Type(() => EquipmentPropertyConfig)
  properties!: EquipmentPropertyConfig;
}
