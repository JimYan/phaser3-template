// CountdownText.js
import * as Phaser from "phaser";

export default class CountdownText extends Phaser.GameObjects.Text {
  private timeline!: Phaser.Tweens.TweenChain;
  private texts = ["3", "2", "1", "Read Go"];
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texts?: Array<string>
  ) {
    super(scene, x, y, "1", { fontSize: "64px", color: "#fff" });
    this.scene = scene;
    this.setOrigin(0.5);

    if (texts) {
      this.texts = texts;
    }

    const self = this;
    // 创建 tweens 时间线
    this.timeline = scene.tweens.chain(this.getConfig());

    this.timeline.play();
    // 启动时间线
  }

  getConfig() {
    const self = this;
    const tween: {
      scaleX: number;
      scaleY: number;
      alpha: number;
      duration: number;
      ease: string;
      onStart?: () => void;
    }[] = [];
    this.texts.forEach((t) => {
      tween.push({
        scaleX: 3,
        scaleY: 3,
        alpha: 1,
        duration: 500, // 放大的持续时间为 500 毫秒
        ease: "Power2",
        onStart: () => {
          // 每个数字放大动画开始时设置文本
          self.setText(t);
        },
      });
      tween.push({
        // targets: this,
        scaleX: 1,
        scaleY: 1,
        alpha: 0,
        duration: 500, // 放大的持续时间为 500 毫秒
        ease: "Power2",
      });
    });
    return {
      targets: this,
      paused: true,
      tweens: tween,
      // tweens: [
      //   {
      //     // targets: this,
      //     scaleX: 3,
      //     scaleY: 3,
      //     alpha: 1,
      //     duration: 500, // 放大的持续时间为 500 毫秒
      //     ease: "Power2",
      //     onStart: () => {
      //       // 每个数字放大动画开始时设置文本
      //       self.setText("3");
      //     },
      //   },
      //   {
      //     // targets: this,
      //     scaleX: 1,
      //     scaleY: 1,
      //     alpha: 0,
      //     duration: 500, // 放大的持续时间为 500 毫秒
      //     ease: "Power2",
      //   },
      //   {
      //     // targets: this,
      //     scaleX: 3,
      //     scaleY: 3,
      //     alpha: 1,
      //     duration: 500, // 放大的持续时间为 500 毫秒
      //     ease: "Power2",
      //     onStart: () => {
      //       // 每个数字放大动画开始时设置文本
      //       self.setText("2");
      //     },
      //   },
      //   {
      //     // targets: this,
      //     scaleX: 1,
      //     scaleY: 1,
      //     alpha: 0,
      //     duration: 500, // 放大的持续时间为 500 毫秒
      //     ease: "Power2",
      //   },
      //   {
      //     // targets: this,
      //     scaleX: 3,
      //     scaleY: 3,
      //     alpha: 1,
      //     duration: 500, // 放大的持续时间为 500 毫秒
      //     ease: "Power2",
      //     onStart: () => {
      //       // 每个数字放大动画开始时设置文本
      //       self.setText("1");
      //     },
      //   },
      //   {
      //     // targets: this,
      //     scaleX: 1,
      //     scaleY: 1,
      //     alpha: 0,
      //     duration: 500, // 放大的持续时间为 500 毫秒
      //     ease: "Power2",
      //   },
      //   {
      //     // targets: this,
      //     scaleX: 2,
      //     scaleY: 2,
      //     alpha: 1,
      //     duration: 500, // 放大的持续时间为 500 毫秒
      //     ease: "Power2",
      //     onStart: () => {
      //       // 每个数字放大动画开始时设置文本
      //       self.setText("Ready Go");
      //     },
      //   },
      //   {
      //     // targets: this,
      //     scaleX: 2,
      //     scaleY: 2,
      //     alpha: 0,
      //     duration: 500, // 放大的持续时间为 500 毫秒
      //     ease: "Power2",
      //   },
      // ],
    };
  }

  restart() {
    this.setScale(1, 1);
    this.setAlpha(1);
    this.setText(this.texts[0]);
    this.scene.tweens.chain(this.getConfig()).play();
    // this.timeline.play();
  }
}
