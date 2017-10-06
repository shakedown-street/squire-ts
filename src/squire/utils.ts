export class Dimension2d {

  constructor(public w: number, public h: number) {}

}

export class Point2d {

  constructor(public x: number, public y: number) {}

  public up(px: number) {
    this.y -= px;
  }

  public down(px: number) {
    this.y += px;
  }

  public left(px: number) {
    this.x -= px;
  }

  public right(px: number) {
    this.x += px;
  }
}

export class Point3d {

  constructor(public x: number, public y: number, public z: number) {}

}

export class Random {

  constructor() {}

  public static between(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + Math.floor(min);
  }
}
