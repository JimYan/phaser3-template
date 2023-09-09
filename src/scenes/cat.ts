import { SpineGameObject } from "@esotericsoftware/spine-phaser";
import { Scene } from "phaser";
import * as Phaser from "phaser";
// import assetsMap from "../../config/asset_map.json";
// import Plane from "../../classes/plane";

export class CatScene extends Scene {
  //   private plane!: Plane;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private dude!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private fire!: Phaser.GameObjects.Particles.ParticleEmitter;
  private fireTest!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private fires!: Phaser.Physics.Arcade.Group;
  private bg!: Phaser.GameObjects.TileSprite;
  private spineboy!: SpineGameObject;
  constructor() {
    super("cat-scene");
  }

  preload(): void {
    this.load.baseURL = "assets/";
    // this.load.setPath("assets/");
    const asset: any = {};
    // this.load.image("bg", `bg.jpg`);
    // this.load.image("cat", `cat.jpg`);

    // MAP LOADING
    this.load.image({
      key: "bg",
      url: "map/bg.jpg",
    });
    this.load.image({
      key: "cat",
      url: "map/cat.jpg",
    });
    this.load.image({
      key: "Grass",
      url: "map/Grass.png",
    });
    this.load.image({
      key: "fire",
      url: "fire.png",
    });
    // this.load.spine("set1", "spine/demo.json", "spine/atlas1.atlas");
    // this.load.spineBinary("spineboy-data", "assets/spineboy-pro.skel");
    // this.load.spineAtlas("spineboy-atlas", "assets/spineboy-pma.atlas");
    //   frameWidth: 512,
    //   frameHeight: 512,
    // });

    this.load.atlas("firecom", "fire-com.png", "fire-com.json");
    this.load.atlas("test", "d/default_name.png", "d/default_name_atlas.json");
    this.load.tilemapTiledJSON("mapx", "map/cat3.json");

    this.load.multiatlas("dude", "dude/dude.json", "dude/");
    // this.load.atlas("dude", "dude/dude.png", "dude/dude.json");

    this.load.multiatlas("mt", "m/m.json", "m/");

    // this.load.setBaseURL("");
    // this.load.setPath("/spine/");
    this.load.spineBinary("spineboy-data", "spineboy-pro.skel");
    this.load.spineAtlas("spineboy-atlas", "spineboy-pma.atlas");

    // const percentText = this.make
    //   .text({
    //     x: (this.game.config.width as number) / 2,
    //     y: (this.game.config.height as number) / 2 - 5,
    //     text: "0%",
    //     style: {
    //       font: "18px monospace",
    //       // fill: "#ffffff",
    //     },
    //   })
    //   .setOrigin(0.5, 0.5);

    // this.load.on("progress", function (value: number) {
    //   percentText.setText(parseInt((value * 100) as unknown as string) + "%");
    // });

    // this.load.on("complete", function () {
    //   percentText.destroy();
    // });
  }

  create(): void {
    // console.log(Phaser);
    const width = this.game.scale.width;
    const height = this.game.scale.height;
    const keyboard = this.input.keyboard;
    this.cursors = keyboard!.createCursorKeys();

    // this.bg = this.add
    //   .image(0, 0, width, height, "dude", "sky.png")
    //   .setOrigin(0, 0)
    //   .setDisplaySize(width, height); // 加载背景图
    const background = this.add.image(0, 0, "dude", "sky.png").setOrigin(0, 0);
    background.setDisplaySize(width, height);

    // this.add.spine(400, 500, "set1.alien", "death", false).setScale(0.2);
    // this.add.spine(400, 200, "set1.dragon", "flying", true).setScale(0.4);
    // this.add.spine(400, 600, "set1.spineboy", "idle", true).setScale(0.4);

    const map = this.make.tilemap({ key: "mapx" }); // 加载地图
    const Grass = map.addTilesetImage("Grass", "Grass"); // 创建图集
    const tileset = map.addTilesetImage("bg3", "bg"); // 创建图块集bg bg3是Tiled中定义的图块集名称 bg是上面加载的图片key
    const catset = map.addTilesetImage("cat2", "cat"); // 创建图块集cat cat2是Tiled中定义的图块集名称 cat是上面加载的图片key
    // const groundLayer = map.createLayer(
    //   "bg1",
    //   tileset as any,
    //   0,
    //   0
    // ) as Phaser.Tilemaps.TilemapLayer; // 创建图层bg1 bg1是Tiled中定义的图层名称 tileset是上面加载的图块集key

    // const clickLayer2 = map.createLayer(
    //   "bg4",
    //   tileset as any,
    //   0,
    //   0
    // ) as Phaser.Tilemaps.TilemapLayer; // 创建bg4 bg4的作用用来展示一些钻饰品 bg4是Tiled中定义的图层名称 tileset是上面加载的图块集key

    const clickLayer = map.createLayer(
      "bg3",
      Grass as any,
      0,
      0
    ) as Phaser.Tilemaps.TilemapLayer; // 创建图层bg3 bg3的作用是用来设置墙体 bg3是Tiled中定义的图层名称 tileset是上面加载的图块集key
    clickLayer.setCollisionByProperty({ collides: true }); // 设置墙的碰撞属性

    // const enemiesPoints = map.filterObjects(
    //   "Enimes",
    //   (obj) => obj.name === "EnimesPoint"
    // ); // 过滤获取Enimes图层中的EnimesPoint对象
    // console.log(enemiesPoints);

    const objectLayer = map.getObjectLayer(
      "Enimes"
    ) as Phaser.Tilemaps.ObjectLayer; // 获取objectLayer
    console.log(objectLayer);

    // const cat = this.add.image(-100, 0 - 16, "cat").setScale(0.1);
    const cat = this.add.image(-100, -100, "mt", "cat.jpg").setScale(0.1);
    // .setFlipX(true)
    // .setFlipY(true);

    this.input.on(
      "pointerdown",
      function (pointer: Phaser.Input.Pointer) {
        var worldX = pointer.x;
        var worldY = pointer.y;

        const tileX = (clickLayer as any).worldToTileX(worldX);
        const tileY = (clickLayer as any).worldToTileY(worldY);

        const clickedTile = clickLayer.getTileAt(tileX, tileY);
        console.log("clickedTile", clickedTile);

        // objectLayer.objects[3];

        const obj = objectLayer.objects
          .filter((obj) => obj.name === "w1")
          .forEach((obj) => {
            const objX = obj.x as number;
            const objY = obj.y as number;
            const objWidth = obj.width as number;
            const objHeight = obj.height as number;
            if (
              worldX >= objX &&
              worldX <= objX + objWidth &&
              worldY >= objY &&
              worldY <= objY + objHeight
            ) {
              // 点击了对象，执行相应操作
              console.log("点击了对象");
              // 执行你的操作逻辑
            }
          });
        // const objX = obj.x as number;
        // const objY = obj.y as number;
        // const objWidth = obj.width as number;
        // const objHeight = obj.height as number;

        // if (
        //   worldX >= objX &&
        //   worldX <= objX + objWidth &&
        //   worldY >= objY &&
        //   worldY <= objY + objHeight
        // ) {
        //   // 点击了对象，执行相应操作
        //   console.log("点击了对象");
        //   // 执行你的操作逻辑
        // } else {
        //   console.log("nope");
        // }

        // const tileX2 = (objectLayer as any).worldToTileX(touchX);
        // const tileY2 = (objectLayer as any).worldToTileY(touchY);
        // const EnimesClick = objectLayer.
        if (clickedTile) {
          // 判断点击了哪个瓦片
          const tileIndex = clickedTile.index;
          console.log("tileIndex", tileIndex);

          // 判断点击的是否是空位
          cat.x = (clickLayer as any).tileToWorldX(tileX) + 1;
          cat.y = (clickLayer as any).tileToWorldY(tileY) + 1;
          if (tileIndex === 0) {
            // 判断是不是第一个空位
            // if (this.cat.x === -100) {
            //     this.cat.x = touchX;
            //     this.cat.y = touchY;
            // }
          }
        } else {
          cat.x = -100;
        }
      },
      this

      // cat.x = touchX;
      // cat.y = touchY;
    );
    // console.log(objectLayer);
    const start = objectLayer.objects.filter((obj) => obj.name === "start")[0];
    const [x, y] = [start.x, start.y] as [number, number];
    // 创建dude的sprite，主要的玩家
    this.dude = this.physics.add
      //   .sprite(10, 100, "dude", "dude-4.png")
      .sprite(x, y, "mt", "dude-4.png")
      .setScale(0.5, 0.5) // 设置缩放
      //   .setBounce(0.2, 0.2) //设置碰撞
      .setCollideWorldBounds(true);
    //   .setGravityY(10);

    this.initAsnims(); // 初始化动画

    // 创建火苗组。
    const fires = this.physics.add.group({
      key: "mt",
      repeat: 10,
      frame: ["fire-2.png"],
      setScale: {
        x: 0.05,
        y: 0.05,
      },
      collideWorldBounds: true,
      //   frictionX: 0,
      //   frictionY: 0,
      //   gravityY: 100,
      setXY: { x: 200, y: 0, stepX: 70 }, // 设置初始x和y坐标, 并且设置每一个间隔的X
    });
    this.fires = fires;
    fires.children.iterate((child: any): any => {
      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.8, 0.8));
      child.setBounceX(Phaser.Math.FloatBetween(0.8, 0.8));
      child.setVelocityX(Phaser.Math.Between(-200, 200));
      child.setVelocityY(Phaser.Math.FloatBetween(-200, 200)); // 设置y轴方向的速度
      //   child.play("fireAnimi");
    }); // 给每个星星一个稍微不同的弹跳
    // this.fireTest = this.physics.add
    //   .sprite(200, 0, "mt", "fire-2.png")
    //   .setScale(0.05, 0.05);
    //   .play("fireAnimi", true);
    const stars = this.physics.add.staticGroup();
    objectLayer.objects
      .filter((obj) => obj.name === "star") // 从object的layer中获取name为star的对象
      .forEach((obj) => {
        // console.log(obj);
        const x = map.tileToWorldX(obj.x as number) as number;
        const y = map.tileToWorldY(obj.y as number) as number;
        // console.log(x, y);
        const star = stars.create(obj.x, obj.y, "mt", "star.png"); // 在锚点中创建一个星星
      });

    this.physics.add.collider(fires, clickLayer);
    // 设置dude和地图中墙体的碰撞
    this.physics.add.collider(this.dude, clickLayer, (a, b) => {
      console.log(a, b);
    });
    // this.physics.world.gravity.y = 100;
    this.physics.world.setBounds(0, 0, width, height);
    // this.dude.setVelocity(1, 0);
    // this.dude.setBounce(0.2, 0.2);
    // this.dude.setFriction(1, 1);
    // this.dude.setCollideWorldBounds(true);
    // this.dude.setGravity(0, 0);
    // this.dude.setBounce(0.8, 0.8);

    this.physics.add.overlap(this.dude, fires, (a, b) => {
      console.log(a, b);
    });

    this.physics.add.overlap(this.dude, stars, (a, b) => {
      console.log("star");
      console.log(a, b);
    });

    // const inputElement = document.getElementById("input-box") as HTMLElement;
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    // inputElement.id = "input-box";
    // inputElement.style.position = "absolute";
    inputElement.placeholder = "请输入";

    document.body.appendChild(inputElement);

    const inputBox = this.add.dom(200, 100, inputElement);

    // 设置输入框的可见性
    inputBox.setVisible(true);

    this.fire = this.add.particles(0, 0, "test", {
      frame: ["fire-2", "fire-4"],
      //   frame: [this.anims.generateFrameNumbers("dude", { start: 0, end: 3 })],
      frequency: 1,
      speed: 2,
      lifespan: 1,
      gravityY: 1,
      quantity: 1,
      scale: { start: 0.03, end: 0.001 },
      alpha: { start: 1, end: 0 },
      follow: this.dude,
      followOffset: {
        x: -10, // X轴偏移量
        y: 10, // Y轴偏移量
      },
    });

    this.spineboy = this.add
      .spine(100, 100, "spineboy-data", "spineboy-atlas")
      .setScale(0.1, 0.1);
    // this.spineboy.scale = 0.1;
    // this.spineboy.flipY = true;
    // this.spineboy.
    this.physics.add.existing(this.spineboy);
    (this.spineboy.body as Phaser.Physics.Arcade.Body)
      // .setVelocity(100, 200)
      .setCollideWorldBounds(true)
      .setBounce(0.2, 0.5);
    // this.spineboy.animationState.
    this.physics.add.collider(this.spineboy, clickLayer, (a, b) => {
      console.log(a, b);
    });
    // this.physics
  }

  update(): void {
    // return;
    // this.bg.tilePositionY -= 1;
    this.dude?.setVelocity(0, 0);
    const dudeSpeed = 150;
    (this.spineboy.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
    // this.fireTest.play("fireAnimi", true);
    this.fires.playAnimation("fireAnimi", "1");
    // this.dude?.stop();
    if (this.cursors.left.isDown) {
      if (this.dude && this.dude.body) {
        this.dude.play("left", true);
        // this.dude.body.velocity.x = -100;
        this.dude.setVelocityX(0 - dudeSpeed);
        (this.spineboy.body as Phaser.Physics.Arcade.Body).setVelocityX(-100);
        this.fire.followOffset.set(this.dude.width / 2, 10);
        this.spineboy.setScale(-0.1, 0.1);
        const current = this.spineboy.animationState.getCurrent(1);
        if (current?.animation?.name != "walk")
          this.spineboy.animationState.setAnimation(1, "walk", true);
        // this.spineboy.toggleFlipX();
      }
    } else if (this.cursors?.right.isDown) {
      if (this.dude) {
        this.dude.play("right", true);
        // this.dude.body.velocity.x = 100;
        this.dude.setVelocityX(dudeSpeed);
        const current = this.spineboy.animationState.getCurrent(1);
        if (current?.animation?.name != "walk")
          this.spineboy.animationState.setAnimation(1, "walk", true);

        // (this.spineboy.animationState.getCurrent(1));
        (this.spineboy.body as Phaser.Physics.Arcade.Body).setVelocityX(100);
        // this.fire?.followOffset.x = this.dude.width / 2;
        this.fire?.followOffset.set(-this.dude.width / 2, 10);
        this.spineboy.setScale(0.1, 0.1);
        //   this.dude?.play("right", true);
        //   (this.dude as any).velocity.x = 10;
      }
      // this.spineboy.setX(200);
    } else if (this.cursors?.down.isDown) {
      if (this.dude) {
        this.dude.play("turn", true);
        this.dude.setVelocityY(dudeSpeed); // = 120;
      }
      const current = this.spineboy.animationState.getCurrent(1);
      if (current?.animation?.name != "walk")
        this.spineboy.animationState.setAnimation(1, "walk", true);

      // (this.spineboy.animationState.getCurrent(1));
      (this.spineboy.body as Phaser.Physics.Arcade.Body).setVelocityY(100);
    } else if (this.cursors?.up.isDown) {
      if (this.dude) {
        this.dude.play("turn", true);
        // this.dude.body.velocity.y = -120;
        this.dude.setVelocityY(-dudeSpeed);
      }
      const current = this.spineboy.animationState.getCurrent(1);
      if (current?.animation?.name != "walk")
        this.spineboy.animationState.setAnimation(1, "walk", true);

      // (this.spineboy.animationState.getCurrent(1));
      (this.spineboy.body as Phaser.Physics.Arcade.Body).setVelocityY(-100);
    } else {
      this.dude?.play("turn");
      // this.spineboy.animationState.timeScale = 0;
      // this.spineboy.animationState.setAnimation(1, "walk");
    }
  }

  initAsnims(): void {
    const frameNames = this.anims.generateFrameNames("mt", {
      start: 0,
      end: 3,
      //   zeroPad: 5,
      prefix: "dude-",
      suffix: ".png",
    });
    this.anims.create({
      key: "left",
      frames: frameNames,
      frameRate: 10,
      repeat: -1,
    });

    const rightFrame = this.anims.generateFrameNames("mt", {
      start: 5,
      end: 8,
      //   zeroPad: 5,
      prefix: "dude-",
      suffix: ".png",
    });
    this.anims.create({
      key: "right",
      frames: rightFrame,
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "mt", frame: "dude-4.png" }],
      //   frames: this.anims.generateFrameNames("mt", {
      //     start: 4,
      //     end: 4,
      //     //   zeroPad: 5,
      //     prefix: "dude-",
      //     suffix: ".png",
      //   }),
      frameRate: 20,
    });

    this.anims.create({
      key: "fireAnimi",
      frames: this.anims.generateFrameNames("mt", {
        start: 2,
        end: 3,
        //   zeroPad: 5,
        prefix: "fire-",
        suffix: ".png",
      }),
      frameRate: 10,
    });
  }
}
