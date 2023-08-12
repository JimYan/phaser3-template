import { Scene, Sound } from "phaser";

import { EVENTS_NAME, GameStatus } from "../../consts";
import { Score, ScoreOperations } from "../../classes/score";
import { Text } from "../../classes/text";
import { gameConfig } from "../../";
import { LEVELS } from "../../consts";

export class UIScene extends Scene {
  private score!: Score;
  private levelName!: string;
  private gameEndPhrase!: Text;

  // private chestLootHandler: () => void;
  // private shoot: () => void;
  // private gameEndHandler: (status: GameStatus) => void;
  private backmusic!:
    | Sound.NoAudioSound
    | Sound.WebAudioSound
    | Sound.HTML5AudioSound;

  constructor() {
    super("ui-scene");
  }

  create(props: any): void {
    const width = this.scale.width as number;
    const height = this.scale.height as number;
    console.log("width", width);
    console.log("height", height);
    // this.add.text(0, 0, "Score: 0", { color: "#ff0000", fontSize: "16px" });
    // this.levelName = props.name;
    this.score = new Score(this, 20, 20, 0);
    // this.add.sprite(width - 20, 20, "chest").setScale(0.5);
    // new Text(this, 20, 100, `关卡：${this.levelName}`);
    this.initListeners();
    this.add.image(width / 2, height - 16, "copyright").setScale(0.9);

    // this.backmusic = this.sound.add("playback");
    // this.backmusic.play({ loop: true, volume: 0.3 });
  }

  shoot(): void {
    console.log("shoot");
    this.score.changeValue(ScoreOperations.INCREASE, 10);
  }

  gameEnd(status: GameStatus): void {
    const width = this.scale.width as number;
    const height = this.scale.height as number;
    if (status === GameStatus.PAUSE) {
      const startButton = this.add
        .sprite(width / 2, height / 2, "startbutton", 1)
        .setInteractive()
        .on("pointerdown", () => {
          // this.backmusic.play({ loop: true, volume: 0.3 });
          this.game.events.emit(EVENTS_NAME.gameStatus, GameStatus.PLAYING);
          this.scene.start("game-scene", {
            name: "Level-1",
          });
          this.scene.start("ui-scene", {
            name: "Level-1",
          });
        });
    }
  }

  private initListeners(): void {
    // this.game.events.on(EVENTS_NAME.chestLoot, this.chestLootHandler, this);
    this.game.events.once(EVENTS_NAME.gameStatus, this.gameEnd, this);
    this.game.events.on(EVENTS_NAME.shoot, this.shoot, this);
  }
}
