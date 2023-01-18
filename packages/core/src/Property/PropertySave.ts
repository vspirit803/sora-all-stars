import { IsNumber, IsString } from "class-validator";

import { PropertyName } from "./Property";

export class PropertySave {
  @IsString()
  name!: PropertyName;

  @IsNumber()
  value!: number;
}
