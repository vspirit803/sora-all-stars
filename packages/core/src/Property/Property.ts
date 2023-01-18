import { ISerialize } from "@core/base";

import { PropertySave } from "./PropertySave";

export class Property implements ISerialize<PropertySave> {
  name: PropertyName;
  value: number;

  constructor() {
    this.name = "ATK";
    this.value = 0;
  }

  loadSave(save: PropertySave): void {
    this.name = save.name;
    this.value = save.value;
  }

  generateSave(): PropertySave {
    return {
      name: this.name,
      value: this.value,
    };
  }

  getSaveStr(): string {
    return JSON.stringify(this.generateSave());
  }
}

export const ATK = "ATK";
export const DEF = "DEF";
export const HP = "HP";
export const MP = "MP";
export const SPD = "SPD";
export type PropertyName =
  | typeof ATK
  | typeof DEF
  | typeof HP
  | typeof MP
  | typeof SPD;
