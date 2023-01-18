export interface ISerialize<T = unknown> {
  loadSave: (save: T) => void;

  generateSave: () => T;

  getSaveStr: () => string;
}
