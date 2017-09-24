import { AnimationDef, Point2d, Renderer } from './squire';
import { SkeletonAnimation, HeavyArmorSwordShield } from './';

export class Entity {

  public animation: any;
  public currentState = 'walk';
  private lastFrameTime = 0;
  private frame = 0;

  constructor(public pos: Point2d) {

  }

  public update() {

  }

  private getDirection() {
    return 0;
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
    let direction = this.getDirection();
    this.animation.render(r, this.currentState, this.frame, direction, this.pos.x, this.pos.y);
  }

  public render(r: Renderer) {
    this.renderAnim(r);
  }

}

export class Hero extends Entity {

  public animation = new HeavyArmorSwordShield();

}

export class Skeleton extends Entity {

  public animation = new SkeletonAnimation();

}
