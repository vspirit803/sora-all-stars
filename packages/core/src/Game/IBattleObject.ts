export interface IBattleObject {
  onBattleStart: ()=> void;

  onBattleEnd: ()=> void;
}

export const IBattleObjectDefault: IBattleObject = {
  onBattleStart() {
    console.log("onBattleStart, default");
  },
  onBattleEnd() {
    // do nothing
    console.log("onBattleEnd, default");
  },
};