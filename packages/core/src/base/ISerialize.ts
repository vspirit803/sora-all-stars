export interface ISerialize {
  loadSave(saveString: string): void;

  getSave(): string;
}
