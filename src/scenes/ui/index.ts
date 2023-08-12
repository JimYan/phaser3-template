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

  private chestLootHandler: () => void;
  private shoot: () => void;
  private gameEndHandler: (status: GameStatus) => void;
  private backmusic!:
    | Sound.NoAudioSound
    | Sound.WebAudioSound
    | Sound.HTML5AudioSound;

  constructor() {
    super("ui-scene");

    this.chestLootHandler = () => {
      this.score.changeValue(ScoreOperations.INCREASE, 10);

      const currentIndex = LEVELS.findIndex(
        (item) => item.name === this.levelName
      );

      if (LEVELS[currentIndex].score === this.score.getValue()) {
        const nextLevel = LEVELS[currentIndex + 1];
        if (nextLevel) {
          this.game.events.off(EVENTS_NAME.chestLoot, this.chestLootHandler);
          this.game.events.off(EVENTS_NAME.gameEnd, this.gameEndHandler);
          this.scene.get("game-scene").scene.restart({ name: nextLevel.name });
          this.scene.restart({ name: nextLevel.name });
        } else {
          if (this.score.getValue() === gameConfig.winScore) {
            this.game.events.emit(EVENTS_NAME.gameEnd, "win");
          }
        }
      }
    };

    this.gameEndHandler = (status) => {
      this.cameras.main.setBackgroundColor("rgba(0,0,0,0.6)");
      this.game.scene.pause("game-scene");

      this.gameEndPhrase = new Text(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
        status === GameStatus.LOSE
          ? `失败!\n\n点击屏幕重新开始`
          : `胜利!\n\n点击屏幕重新开始`
      )
        .setAlign("center")
        .setColor(status === GameStatus.LOSE ? "#ff0000" : "#ffffff");

      this.gameEndPhrase.setPosition(
        this.game.scale.width / 2 - this.gameEndPhrase.width / 2,
        this.game.scale.height * 0.4
      );

      this.input.on("pointerdown", () => {
        this.game.events.off(EVENTS_NAME.chestLoot, this.chestLootHandler);
        this.game.events.off(EVENTS_NAME.gameEnd, this.gameEndHandler);
        this.scene.get("game-scene").scene.restart({ name: "Level-1" });
        this.scene.restart({ name: "Level-1" });
      });
    };

    this.shoot = () => {
      console.log("shoot");
      this.score.changeValue(ScoreOperations.INCREASE, 10);
    };
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

    this.backmusic = this.sound.add("playback");
    this.backmusic.play({ loop: true, volume: 0.3 });
  }

  // shoot(): void {
  //   console.log("shoot");
  //   this.score.changeValue(ScoreOperations.INCREASE, 10);
  // }

  gameEnd(status: GameStatus): void {
    const width = this.scale.width as number;
    const height = this.scale.height as number;
    console.log("width", width);
    console.log("height", height);
    console.log("gameEnd", status);
    if (status === GameStatus.PAUSE) {
      this.backmusic.stop();
      const startButton = this.add
        .sprite(width / 2, height / 2, "startbutton", 1)
        .setInteractive()
        .on("pointerdown", () => {
          this.backmusic.play({ loop: true, volume: 0.3 });
          this.game.events.emit(EVENTS_NAME.gameEnd, GameStatus.PLAYING);
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
    this.game.events.once(EVENTS_NAME.gameEnd, this.gameEnd, this);
    this.game.events.on(EVENTS_NAME.shoot, this.shoot, this);
  }
}
