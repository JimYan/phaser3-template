export enum EVENTS_NAME {
  addPh = "app-pd",
  // gameEnd = "game-end",
  chestLoot = "chest-loot",
  attack = "attack",
  shoot = "shoot",
  planeAttack = "plane-attack",
  newBullet = "new-bullet",
  gameStatus = "game-status",
}

export const LEVELS = [
  {
    name: "Level-1",
    score: 30,
  },
  {
    name: "Level-2",
    score: 100,
  },
];

export enum GameStatus {
  WIN,
  LOSE,
  PLAYING,
  PAUSE,
}
