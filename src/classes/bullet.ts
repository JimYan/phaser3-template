import { Physics, Sound } from "phaser";
import Plane from "./plane";
import { iSound } from "../app";
import { EVENTS_NAME } from "../consts";
export default class Bullet extends Physics.Arcade.Sprite {
  protected hp = 100;
  protected beforeTime = new Date().getTime();
  protected plane!: Plane;
  protected pi!: iSound;
  //   private scene: Phaser.Scene;
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, "mybullet");
    this.pi = this.scene.sound.add("pi");
  }

  public fire(plane: Plane): void {
    this.plane = plane;
    this.x = this.plane.x;
    this.y = this.plane.y - this.plane.height / 2;
    this.setActive(true);
    this.setVisible(true);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.getBody().setVelocity(0, -300);
    this.pi.play();
    this.scene.game.events.emit(EVENTS_NAME.newBullet);
  }

  // public stop(): void {}

  public update(): void {
    if (this.y < -50) {
      // 这两个方法是用来处理当前sprite的激活状态和显示隐藏状态的
      // api: https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Sprite.html#setActive__anchor
      this.setActive(false);
      this.setVisible(false);
    }
  }

  // public destroy(): void {
  //   this.setActive(false);
  //   this.setVisible(false);
  // }

  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }
}
