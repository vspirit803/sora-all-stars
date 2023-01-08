import { ISerialize } from "@core/base";

import packageJson from "../../package.json";

export class Game implements ISerialize {
  version: string;
  startTime: Date;
  loadTime: Date;

  constructor() {
    this.version = packageJson.version;
    this.startTime = new Date();
    this.loadTime = new Date();
  }

  loadSave(saveString: string): void {
    if (saveString === "") {
      return;
    }

    const save = JSON.parse(saveString);
    this.version = save.version;
    this.startTime = new Date(save.createDate);
  }

  getSave(): string {
    return JSON.stringify({
      version: this.version,
      createDate: this.startTime.toISOString(),
    });
  }
}
