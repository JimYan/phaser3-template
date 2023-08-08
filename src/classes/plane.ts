import { Physics } from "phaser";

export default class Plane extends Physics.Arcade.Sprite {
  protected hp = 100;
  //   private scene: Phaser.Scene;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    // this.scene = scene;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setInteractive({ draggable: true });
    this.getBody().setCollideWorldBounds(true);

    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("myplane", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    // 飞机调用飞行动画
    this.anims.play("fly");
  }

  public start(delay = 1000) {
    const self = this;
    this.scene.tweens.add({
      targets: this,
      y: (this.scene.game.scale.height as number) - this.height,
      duration: delay,
      onComplete: () => {
        self.on("drag", function (_pointer: any, dragX: number, dragY: number) {
          // console.log("drag");
          self.x = dragX;
          self.y = dragY;
        });
      },
    });
  }

  public getDamage(value?: number): void {
    this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: 3,
      yoyo: true,
      alpha: 0.5,
      onStart: () => {
        if (value) {
          this.hp = this.hp - value;
        }
      },
      onComplete: () => {
        this.setAlpha(1);
      },
    });
  }

  public destroy(): void {
    this.scene.physics.world.disableBody(this.body as Physics.Arcade.Body);
    super.destroy();
  }

  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }
}
