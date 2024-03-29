import { GameObjects, Scene, Tilemaps, Input, Math } from "phaser";

import { Player } from "../../classes/player";
import Plane from "../../classes/plane";
import Bullet from "../../classes/bullet";
// import { Enemy } from "../../classes/enemy";
import Enemy from "../../classes/enemy2";
import { EVENTS_NAME, GameStatus } from "../../consts";
type iSound =
  | Phaser.Sound.NoAudioSound
  | Phaser.Sound.HTML5AudioSound
  | Phaser.Sound.WebAudioSound;
export class GameScene extends Scene {
  private player!: Player;
  private plane!: Plane;
  private bullet!: Bullet;
  private bullets!: GameObjects.Group;
  protected beforeTime = new Date().getTime();
  private bg!: Phaser.GameObjects.TileSprite;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private wallsLayer!: Tilemaps.TilemapLayer;
  // @ts-ignore
  private groundLayer!: Tilemaps.TilemapLayer;
  private chests!: GameObjects.Sprite[];
  // private enemies!: Enemy[];
  private enemies1!: GameObjects.Group;
  private enemies2!: GameObjects.Group;
  private enemies3!: GameObjects.Group;
  private enemyBeforeTime = 0;
  private status = GameStatus.PLAYING;
  private pi!: iSound;
  private crash!: iSound;

  constructor() {
    super("game-scene");
  }

  private gameStop(): void {
    // this.physics.pause();
    this.status = GameStatus.PAUSE;
    this.bullets.getChildren().forEach((item) => {
      // console.log("item", item);
      // item.kill();
      (item as Bullet).destroy(true);
      // item.
    });
    ["enemies1", "enemies2", "enemies3"].forEach((item) => {
      (this as any)[item].getChildren().forEach((item: any) => {
        item.destroy();
      });
    });
    this.game.events.emit(EVENTS_NAME.gameStatus, GameStatus.PAUSE);
  }

  create(props: any): void {
    this.game.events.on(EVENTS_NAME.gameStatus, (status: any) => {
      this.status = status;
    });

    // const ao = this.sound.add("ao");
    // this.pi = this.sound.add("pi");
    // this.crash = this.sound.add("crash3");

    const width = this.game.scale.width;
    const height = this.game.scale.height;
    // console.log("width", width);
    this.bg = this.add.tileSprite(0, 0, width, height, "bg").setOrigin(0, 0);
    this.plane = new Plane(this, width / 2 - 5, 100, "myplane");
    // this.plane.
    // return;

    this.bullets = this.add.group({
      classType: Bullet,
      runChildUpdate: true,
    });

    this.enemies1 = this.add.group({
      classType: Enemy,
      key: "enemy1",
      runChildUpdate: true,
    });
    this.enemies2 = this.add.group({
      classType: Enemy,
      key: "enemy2",
      runChildUpdate: true,
    });
    this.enemies3 = this.add.group({
      classType: Enemy,
      key: "enemy3",
      runChildUpdate: true,
    });

    const self = this;
    ["enemies1", "enemies2", "enemies3"].forEach((item) => {
      this.physics.add.overlap(
        this.bullets,
        (this as any)[item],
        function (bullet, enemy) {
          bullet.destroy();
          // bullet.disableBody(true, true);
          enemy.destroy();
          // enemy.kill();
          // self.crash.play();
          self.game.events.emit(EVENTS_NAME.shoot);
        },
        undefined,
        this
      );
      this.physics.add.overlap(
        this.plane,
        (this as any)[item],
        function (plane, enemy) {
          console.log("plane attach", plane);
          self.plane.attack();
          self.gameStop();
          self.game.events.emit(EVENTS_NAME.planeAttack);
          // ao.play();
          // bullet.destroy();
          // enemy.destroy();
        },
        undefined,
        this
      );
    });

    // this.bullets.createMultiple({
    //   classType: Bullet,
    //   key: "mybullet",
    //   quantity: 5,
    //   active: false,
    //   visible: false,
    // });

    // const startButton = this.add
    //   .sprite(width / 2, 200, "startbutton", 1)
    //   .setInteractive();
    // startButton.on("pointerdown", () => {
    //   startButton.setFrame(0);
    // });
    // startButton.on("pointerup", () => {
    //   startButton.setFrame(1);
    //   console.log("start game");
    // });

    // const plane = this.add.sprite(width / 2 - 5, 100, "myplane");
    // createLizardAnims(this.anims);
    // this.initMap(props.name);
    // this.player = new Player(this, 100, 100);
    // this.initChests();
    // this.initEnemies();
    // this.initCamera();
    // this.physics.add.collider(this.player, this.wallsLayer);
    this.plane.start();

    this.input.on(
      "pointerdown",
      function (pointer: Phaser.Input.Pointer) {
        var touchX = pointer.x;
        var touchY = pointer.y;
        console.log("touchX", touchX);
        // pointer.event.preventDefault();
        // ...
      }
      // this
    );
  }

  update(): void {
    // return;
    const time = new Date().getTime();
    this.bg.tilePositionY -= 1;

    // this.plane.update();
    if (this.status === GameStatus.PLAYING && time - this.beforeTime > 300) {
      const bullet = this.bullets.getFirstDead(true);
      if (bullet) {
        bullet.fire(this.plane);
        this.beforeTime = time;
      }
      // this.pi.play();
    }
    // console.log("this.bullets", this.bullets.getLength());

    if (
      this.status === GameStatus.PLAYING &&
      time - this.enemyBeforeTime > 500
    ) {
      // Phaser提供的Math对象，Between表示两者之间的整数
      // api: https://photonstorm.github.io/phaser3-docs/Phaser.Math.html
      const enemyIndex = Math.Between(1, 3);
      const enemy = (this as any)[`enemies${enemyIndex}`].getFirstDead(
        true,
        0,
        0,
        `enemy${enemyIndex}`
      );
      if (enemy) {
        enemy.start();
        this.enemyBeforeTime = time;
      }
    }

    // var pointer = this.input.activePointer;
    // if (pointer.isDown) {
    //   var touchX = pointer.x;
    //   var touchY = pointer.y;
    //   // ...
    // }
    // this.bg.setPosition();
    // this.player.update();
  }
}
