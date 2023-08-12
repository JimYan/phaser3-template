import { Game, Scale, Types, WEBGL, AUTO } from "phaser";

import { GameScene, LoadingScene, UIScene, AudioScene } from "./scenes";

type GameConfigExtended = Types.Core.GameConfig & {
  winScore: number;
};

export const gameConfig: GameConfigExtended = {
  type: AUTO,
  parent: "app",
  backgroundColor: "#9bd4c3",
  scale: {
    mode: Scale.RESIZE,
    // width: window.innerWidth,
    // height: window.innerHeight,
  },
  width: 375,
  height: 667,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  callbacks: {
    postBoot: () => {
      sizeChanged();
    },
  },
  canvasStyle: `display: block; width: 100%; height: 100%;`,
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: [LoadingScene, GameScene, UIScene, AudioScene],
  winScore: 100,
};

function sizeChanged() {
  // if (window.game.isBooted) {
  //   setTimeout(() => {
  //     window.game.scale.resize(window.innerWidth, window.innerHeight);
  //     window.game.canvas.setAttribute(
  //       "style",
  //       `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
  //     );
  //   }, 100);
  // }
}

window.onresize = () => sizeChanged();

const button = document.querySelector("#btnStart");

(button as Element).addEventListener("click", () => {
  // var game = new Phaser.Game();
  button?.remove();
  window.game = new Game(gameConfig);
});
