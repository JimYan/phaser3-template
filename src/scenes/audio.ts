import { Scene, Sound } from "phaser";

import { EVENTS_NAME, GameStatus } from "../consts";
import { iSound } from "../app";

export class AudioScene extends Scene {
  private backmusic!: iSound;
  private ao!: iSound;
  private crash3!: iSound;
  private pi!: iSound;

  constructor() {
    super("audio-scene");
  }

  create(props: any): void {
    this.initListeners();

    // 背景音乐
    this.backmusic = this.sound.add("playback");
    this.backmusic.play({ loop: true, volume: 0.3 });

    this.ao = this.sound.add("ao"); // 发射子弹
    this.crash3 = this.sound.add("crash3"); // 被敌机击中
    this.pi = this.sound.add("pi"); // 击中敌机
  }

  gameEnd(status: GameStatus): void {
    if (status === GameStatus.PAUSE) {
      this.backmusic.stop();
    } else if (status === GameStatus.PLAYING) {
      this.backmusic.play({ loop: true, volume: 0.3 });
    }
  }

  shoot(): void {
    this.pi.play();
  }
  attach(): void {
    this.crash3.play();
  }
  newbullet(): void {
    this.ao.play();
  }

  private initListeners(): void {
    this.game.events.once(EVENTS_NAME.gameStatus, this.gameEnd, this); // 游戏结束
    this.game.events.on(EVENTS_NAME.attack, this.attach, this); // 被敌机击中
    this.game.events.on(EVENTS_NAME.shoot, this.shoot, this); // 击中敌机
    this.game.events.on(EVENTS_NAME.newBullet, this.newbullet, this); // 发射子弹
  }
}
