import { Scene } from "phaser";
import assetsMap from "../../config/asset_map.json";
import Plane from "../../classes/plane";

export class LoadingScene extends Scene {
  private plane!: Plane;
  constructor() {
    super("loading-scene");
  }

  preload(): void {
    this.load.baseURL = "assets/";
    // this.load.spritesheet("myplane", "plan/myplane.png", {
    //   frameWidth: 40,
    //   frameHeight: 40,
    // });
    // this.load.image("bg", "plan/bg.jpg");
    // this.load.image("copyright", "plan/copyright.png");
    // this.load.spritesheet("startbutton", `plan/startbutton.png`, {
    //   frameWidth: 100,
    //   frameHeight: 40,
    // });
    // return;
    const asset: any = {};
    for (const key in assetsMap) {
      if (assetsMap.hasOwnProperty(key)) {
        if (key === "myplane") {
          this.load.spritesheet(key, `./${assetsMap[key]}`, {
            frameWidth: 40,
            frameHeight: 40,
          });
          continue;
        }
        if (key === "startbutton") {
          this.load.spritesheet(key, `./${assetsMap[key]}`, {
            frameWidth: 100,
            frameHeight: 40,
          });
          continue;
        }
        if (key === "replaybutton") {
          this.load.spritesheet(key, `./${assetsMap[key]}`, {
            frameWidth: 80,
            frameHeight: 30,
          });
          continue;
        }
        if (key === "explode1") {
          this.load.spritesheet(key, `./${assetsMap[key]}`, {
            frameWidth: 20,
            frameHeight: 20,
          });
          continue;
        }
        if (key === "explode2") {
          this.load.spritesheet(key, `./${assetsMap[key]}`, {
            frameWidth: 30,
            frameHeight: 30,
          });
          continue;
        }
        if (key === "explode3") {
          this.load.spritesheet(key, `./${assetsMap[key]}`, {
            frameWidth: 50,
            frameHeight: 50,
          });
          continue;
        }
        if (key === "myexplode") {
          this.load.spritesheet(key, `./${assetsMap[key]}`, {
            frameWidth: 40,
            frameHeight: 40,
          });
          continue;
        }
        if (key === "ao") {
          this.load.audio(key, `./${assetsMap[key]}`);
          continue;
        }
        if (key === "crash1") {
          this.load.audio(key, `./${assetsMap[key]}`);
          continue;
        }
        if (key === "crash2") {
          this.load.audio(key, `./${assetsMap[key]}`);
          continue;
        }
        if (key === "crash3") {
          this.load.audio(key, `./${assetsMap[key]}`);
          continue;
        }
        if (key === "deng") {
          this.load.audio(key, `./${assetsMap[key]}`);
          continue;
        }
        if (key === "fashe") {
          this.load.audio(key, `./${assetsMap[key]}`);
          continue;
        }
        if (key === "normalback") {
          this.load.audio(key, `./${assetsMap[key]}`);
          continue;
        }
        if (key === "pi") {
          this.load.audio(key, `./${assetsMap[key]}`);
          continue;
        }
        if (key === "playback") {
          this.load.audio(key, `./${assetsMap[key]}`);
          continue;
        }
        asset[key] = this.load.image(
          key,
          `./${(assetsMap as unknown as any)[key]}`
        );
      }
    }

    // if (!this.game.device.os.desktop) {
    //   this.scale.scaleMode = Phaser.Scale.FIT;
    //   this.scale.refresh();
    // }

    // // PLAYER LOADING
    // this.load.image("king", "sprites/king.png");
    // this.load.atlas(
    //   "a-king",
    //   "spritesheets/a-king_withmask.png",
    //   "spritesheets/a-king_atlas.json"
    // );
    // this.load.atlas(
    //   "lizard",
    //   "spritesheets/lizard.png",
    //   "spritesheets/lizard.json"
    // );

    // // MAP LOADING
    // this.load.image({
    //   key: "Grass",
    //   url: "tilemaps/json/Grass.png",
    // });
    // this.load.image({
    //   key: "Fences",
    //   url: "tilemaps/json/Fences.png",
    // });

    // this.load.tilemapTiledJSON("Level-1", "tilemaps/json/level-1.json");
    // this.load.tilemapTiledJSON("Level-2", "tilemaps/json/Grass.json");

    // this.load.spritesheet("water", "spritesheets/Water.png", {
    //   frameWidth: 64,
    //   frameHeight: 16,
    // });

    // this.load.spritesheet("food", "spritesheets/food.png", {
    //   frameWidth: 32,
    //   frameHeight: 32,
    // });

    const percentText = this.make
      .text({
        x: (this.game.config.width as number) / 2,
        y: (this.game.config.height as number) / 2 - 5,
        text: "0%",
        style: {
          font: "18px monospace",
          // fill: "#ffffff",
        },
      })
      .setOrigin(0.5, 0.5);

    this.load.on("progress", function (value: number) {
      percentText.setText(parseInt((value * 100) as unknown as string) + "%");
    });

    this.load.on("complete", function () {
      percentText.destroy();
    });
  }

  create(): void {
    console.log(Phaser);
    const width = this.game.scale.width;
    const height = this.game.scale.height;
    this.add.image(0, 0, "bg").setOrigin(0, 0);
    // this.plane = new Plane(this, width / 2 - 5, 100, "myplane");
    this.add.image(width / 2, height - 16, "copyright").setScale(0.9);

    const startButton = this.add
      .sprite(width / 2, 200, "startbutton", 1)
      .setInteractive();
    // startButton.
    // console.log(startButton);

    // this.input.on(
    //   "pointerdown",
    //   function (pointer: any) {
    //     var touchX = pointer.x;
    //     var touchY = pointer.y;
    //     // ...
    //   }
    //   // scope
    // );

    // startButton.on("pointerdown", () => {
    //   console.log("pointerdown");
    //   // startButton.setFrame(0);
    // });
    // startButton.on("pointerup", () => {
    //   // startButton.setFrame(1);
    //   console.log("start game");
    //   this.scene.start("game-scene", {
    //     name: "Level-1",
    //   });
    //   this.scene.start("ui-scene", {
    //     name: "Level-1",
    //   });
    // });

    console.log("start game");
    this.scene.start("game-scene", {
      name: "Level-1",
    });
    this.scene.start("ui-scene", {
      name: "Level-1",
    });
    this.scene.start("audio-scene");
  }
}
