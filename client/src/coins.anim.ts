import { AnimationDef } from './squire';

export class CoinsAnim extends AnimationDef {

  public getImageUrl(): any {
    return "assets/items.png";
  }

  public animations = {
    "drop": {
      "duration": 100,
      "frames": [
        [0, 0, 0, 3919, 96, 160, 48, 144],
        [1, 0, 96, 3919, 96, 160, 48, 144],
        [2, 0, 192, 3919, 96, 160, 48, 144],
        [3, 0, 288, 3919, 96, 160, 48, 144],
        [4, 0, 384, 3919, 96, 160, 48, 144],
        [5, 0, 480, 3919, 96, 160, 48, 144],
        [6, 0, 576, 3919, 96, 160, 48, 144],
        [7, 0, 672, 3919, 96, 160, 48, 144],
        [8, 0, 768, 3919, 96, 160, 48, 144],
        [9, 0, 864, 3919, 96, 160, 48, 144]
      ]
    }
  }
}
