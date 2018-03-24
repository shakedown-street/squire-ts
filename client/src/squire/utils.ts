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

  public static angleBetween(pointA: Point2d, pointB: Point2d) {
    return Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x) * 180 / Math.PI;
  }
}

export class Random {

  constructor() {}

  public static between(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + Math.floor(min);
  }
}