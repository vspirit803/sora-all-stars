import { PropertyName, PropertySave } from "@core/Property";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";

class PropertiesSave implements Record<PropertyName, PropertySave> {
  @ValidateNested()
  @Type(() => PropertySave)
  ATK!: PropertySave;

  @ValidateNested()
  @Type(() => PropertySave)
  DEF!: PropertySave;

  @ValidateNested()
  @Type(() => PropertySave)
  HP!: PropertySave;

  @ValidateNested()
  @Type(() => PropertySave)
  MP!: PropertySave;

  @ValidateNested()
  @Type(() => PropertySave)
  SPD!: PropertySave;
}

export class CharacterSave {
  @IsString()
  name!: string;

  @ValidateNested()
  @Type(() => PropertiesSave)
  properties!: PropertiesSave;
}
