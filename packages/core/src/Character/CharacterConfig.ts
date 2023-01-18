import { PropertyName } from "@core/Property";

export interface CharacterConfig {
  name: string;
  properties: Record<PropertyName, number>;
}
