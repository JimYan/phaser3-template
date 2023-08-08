import { Physics, Math } from "phaser";
import Plane from "./plane";
import { EVENTS_NAME } from "../consts";

export default class Enemy extends Physics.Arcade.Sprite {
  protected hp = 100;
  protected beforeTime = new Date().getTime();
  protected plane!: Plane;
  //   constructor(scene: Phaser.Scene, _x: number, _y: number, texture: string) {
  //     super(scene, 0, 0, texture);
  //   }

  public fire(plane: Plane): void {
    this.plane = plane;
    this.x = this.plane.x;
    this.y = this.plane.y - this.plane.height / 2;
    this.setActive(true);
    this.setVisible(true);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.getBody().setVelocity(0, -300);
  }

  public start() {
    this.show();
    this.setOrigin(0.5, 0.5);
    this.setPosition(
      Math.Between(
        0 + this.width,
        (this.scene.game.config.width as number) - this.width
      ),
      0
    );
    this.scene.physics.add.existing(this);
    this.getBody().setVelocity(0, 200);
  }

  public update(): void {
    if (this.y > this.scene.game.scale.height) {
      // 这两个方法是用来处理当前sprite的激活状态和显示隐藏状态的
      // api: https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Sprite.html#setActive__anchor
      this.setActive(false);
      this.setVisible(false);
    }
  }

  public destroy(): void {
    if (this.active && this.visible) {
      this.setActive(false);
      this.setVisible(false);
      this.scene.game.events.emit(EVENTS_NAME.shoot);
    }
  }

  private show() {
    this.setActive(true);
    this.setVisible(true);
  }

  public hide() {
    this.setActive(false);
    this.setVisible(false);
  }

  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }
}
