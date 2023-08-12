import { Scene } from "phaser";
export class DemoScene extends Scene {
  constructor() {
    super("demo-scene");
  }

  preload(): void {
    this.load.baseURL = "assets/";
    this.load.image("bg", "plan/bg.jpg");
  }

  create(): void {
    console.log(Phaser);
    const width = this.game.scale.width;
    const height = this.game.scale.height;
    this.add.image(0, 0, "bg").setOrigin(0, 0);
    // this.plane = new Plane(this, width / 2 - 5, 100, "myplane");
  }
}
