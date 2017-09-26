import { AnimationDef, Point2d, Renderer } from './squire';
import { HeavyArmorSwordShield } from './';

export class Entity {

  public animation: any;
  public currentState = 'idle';
  public direction = 0;
  private lastFrameTime = 0;
  private frame = 0;

  constructor(public pos: Point2d) {

  }

  public update(dt: number) {}

  public switchAnim(name: string) {
    if (this.currentState !== name) {
      this.currentState = name;
      this.frame = 0;
    }
  }

  public renderAnim(r: Renderer) {
    let now = Date.now();
    let animationDuration = this.animation.animations[this.currentState].duration;
    let needsNewFrame = now - this.lastFrameTime > animationDuration;
    if (needsNewFrame) {
      let frameCount = this.animation.animations[this.currentState].frames.length / 8;
      this.frame = (this.frame + 1) % frameCount;
      this.lastFrameTime = now;
    }
    this.animation.render(r, this.currentState, this.frame, this.direction, this.pos.x, this.pos.y);
  }

  public render(r: Renderer) {
    this.renderAnim(r);
  }
}

export class Hero extends Entity {

  public animation = new HeavyArmorSwordShield();
  public updates = 0;

  constructor(pos: Point2d) {
    super(pos);
  }

  private degreesToRadians(degrees: number) {
    return (degrees * Math.PI) / 180;
  }

  private segmentDivider(r: Renderer, num: number, x1: number, y1: number, length: number, angle: number) {
    angle = this.degreesToRadians(angle);
    let to = {
      x: x1 + length * Math.cos(angle),
      y: y1 + length * Math.sin(angle)
    }
    r.line(x1, y1, to.x, to.y, 'black', 2);
    r.text('' + num, to.x, to.y);
  }

  public move(px: number, direction: number) {
    let px_diagonal = px / 2 * 2 ** .5;

    this.direction = direction;

    switch (direction) {
      case 0:
        this.pos.down(px);
        break;
      case 1:
        this.pos.down(px_diagonal);
        this.pos.left(px_diagonal);
      break;
      case 2:
        this.pos.left(px);
        break;
      case 3:
        this.pos.up(px_diagonal);
        this.pos.left(px_diagonal);
      break;
      case 4:
        this.pos.up(px);
        break;
      case 5:
        this.pos.up(px_diagonal);
        this.pos.right(px_diagonal);
      break;
      case 6:
        this.pos.right(px);
        break;
      case 7:
        this.pos.down(px_diagonal);
        this.pos.right(px_diagonal);
      break;
    }
  }

  public update(dt: number) {
    if (this.direction >= 0) {
      // this.move(1, this.direction);
    }
  }

  public render(r: Renderer) {
    super.render(r);
    // for (let seg = 0; seg < 8; seg++) {
    //   this.segmentDivider(r, seg, this.pos.x + 48, this.pos.y + 48, 160, (seg * 45) + 90);
    // }
  }
}
