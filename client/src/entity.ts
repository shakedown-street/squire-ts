import { AnimationDef, Point2d, Renderer, Random } from './squire';
import { HeavyArmorSwordShield, BlackKnight } from './';

export abstract class Entity {

  public animation: any;
  public currentState = 'idle';
  public direction = 0;
  protected lastFrameTime = 0;
  protected frame = 0;

  // TODO: Make accuracy/armor have a block chance rather than damage reduction
  public maxHitpoints = 100;
  public hitpoints = 100;
  public attackRange = 96;
  public attackSpeed = 1;
  public accuracy = 0;
  public armor = 0;
  public maxDamage = 10;
  public minDamageMultiplier = .7;
  public walkSpeed = 50;

  public target: any;
  public walkTo: Point2d;

  constructor(public pos: Point2d) {}

  public isDead() {
    return this.hitpoints <= 0;
  }

  public switchAnim(name: string) {
    if (this.currentState !== name) {
      this.currentState = name;
      this.frame = 0;
    }
  }

  public takeDamage(damage: number) {
    this.hitpoints -= damage;
    if (this.isDead()) {
      this.switchAnim('die');
    }
  }

  public dealDamageToTarget() {
    let targetArmor = this.target.armor;
    let armorEffect = targetArmor >= this.accuracy ? this.accuracy / targetArmor : targetArmor / this.accuracy;
    let max = this.maxDamage * armorEffect;
    let min = this.maxDamage * this.minDamageMultiplier * armorEffect;
    let calcHit = Random.between(min, max);
    this.target.takeDamage(calcHit);
    if (this.target.isDead())  {
      this.switchAnim('idle');
    }
  }

  public getDirection(): any {
    if (!this.walkTo) {
      return 8;
    }
    let dx = this.pos.x - this.walkTo.x;
    let dy = this.pos.y - this.walkTo.y;

    if (Math.abs(dx) + Math.abs(dy) < 1) {
      return -1;
    } else if (Math.abs(dx) - Math.abs(dy) > 5) {
      return dx < 0 ? 6 : 2;
    } else if (Math.abs(dy) - Math.abs(dx) > 5) {
      return dy < 0 ? 0 : 4;
    } else if (dx > 0 && dy > 0) {
      return 3;
    } else if (dx < 0 && dy < 0) {
      return 7;
    } else if (dx > 0 && dy < 0) {
      return 1;
    } else if (dx < 0 && dy > 0) {
      return 5;
    }
    return 2;
  }

  public move(px: number, direction: number) {
    let px_diagonal = px / 2 * 2 ** .5;
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

  private degreesToRadians(degrees: number) {
    return (degrees * Math.PI) / 180;
  }

  public segmentDivider(r: Renderer, num: number, x1: number, y1: number, length: number, angle: number) {
    angle = this.degreesToRadians(angle);
    let to = {
      x: x1 + length * Math.cos(angle),
      y: y1 + length * Math.sin(angle)
    }
    r.line(x1, y1, to.x, to.y, 'black', 2);
    r.text('' + num, to.x, to.y);
  }

  public renderAnim(r: Renderer) {
    let now = Date.now();
    let animationDuration = this.animation.animations[this.currentState].duration;
    if (this.currentState === 'attack') {
      animationDuration = animationDuration / this.attackSpeed;
    }
    let needsNewFrame = now - this.lastFrameTime > animationDuration;
    if (needsNewFrame) {
      let frameCount = this.animation.animations[this.currentState].frames.length / 8;
      if ((this.frame + 1) === frameCount && this.currentState === 'die') {

      } else if (this.frame === 8 && this.currentState === 'attack') {
        if (this.target && this.targetInRange() && !this.target.isDead()) {
          this.dealDamageToTarget();
        }
        this.frame = (this.frame + 1) % frameCount;
        this.lastFrameTime = now;
      } else if (this.frame === 15 && this.currentState === 'attack') {
        this.switchAnim('idle');
      } else if (this.frame === 19 && this.currentState === 'magic_lightning') {
        this.switchAnim('idle');
      } else {
        this.frame = (this.frame + 1) % frameCount;
        this.lastFrameTime = now;
      }
    }
    let direction = this.getDirection() === -1 ? 2 : this.getDirection()
    this.animation.render(r, this.currentState, this.frame, direction, this.pos.x, this.pos.y);
  }

  public renderHp(r: Renderer) {
    let width = 50;
    let healthPercent = this.hitpoints / this.maxHitpoints;
    let healthWidth = width * healthPercent >= 0 ? width * healthPercent : 0;
    r.rect('red', this.pos.x - (width / 2), this.pos.y - width, width, 6);
    r.rect('green', this.pos.x - (width / 2), this.pos.y - 50, healthWidth, 6);
  }

  public render(r: Renderer) {
    this.renderAnim(r);
    // r.circle('blue', this.pos.x, this.pos.y, 5);
    // r.circle('green', this.walkTo.x, this.walkTo.y, 5);
    if (!this.isDead()) {
      this.renderHp(r);
    }
  }

  public targetInRange() {
    let targetDx = this.pos.x - this.target.pos.x;
    let targetDy = this.pos.y - this.target.pos.y;
    let targetWithinX = Math.abs(targetDx) < this.attackRange;
    let targetWithinY = Math.abs(targetDy) < (this.attackRange / 2);
    return targetWithinX && targetWithinY;
  }

  public walkToComplete() {
    let walkDx = this.pos.x - this.walkTo.x;
    let walkDy = this.pos.y - this.walkTo.y;
    let walkWithinX = Math.abs(walkDx) <= 10;
    let walkWithinY = Math.abs(walkDy) <= 10;
    return walkWithinX && walkWithinY;
  }

  public update(dt: number, entities: Entity[]) {
    if (this.isDead()) {
      this.switchAnim('die');
      return;
    }
    if (this.currentState === 'attack') {
      return;
    }
    if (this.targetInRange() && !this.target.isDead()) {
      this.switchAnim('attack');
    } else if (this.walkTo && !this.walkToComplete()) {
      this.currentState = 'walk';
      this.move(this.walkSpeed * dt, this.getDirection());
    } else {
      this.currentState = 'idle';
      if (this.frame > 7) {
        this.frame = 0;
      }
    }
  }

  public setTarget(entity: any) {
    this.target = entity;
  }
}

// Default Npc
// public maxHitpoints = 100;
// public hitpoints = 100;
// public attackRange = 96;
// public attackSpeed = 1;
// public accuracy = 0;
// public armor = 0;
// public maxDamage = 10;
// public minDamageMultiplier = .7;
// public walkSpeed = 75;

export class BlackKnightEntity extends Entity {
  public animation = new BlackKnight();
  public maxHitpoints = 2000;
  public hitpoints = 2000;
  public attackRange = 128;
  public attackSpeed = .75;
  public accuracy = 435;
  public armor = 350;
  public maxDamage = 640;
  public minDamageMultiplier = .75;
  public walkSpeed = 50;
}

export class HeavyArmorSwordShieldEntity extends Entity {
  public animation = new HeavyArmorSwordShield();
  public maxHitpoints = 2000;
  public hitpoints = 2000;
  public attackRange = 96;
  public attackSpeed = 1.25;
  public accuracy = 326;
  public armor = 315;
  public maxDamage = 315;
  public minDamageMultiplier = .9;
  public walkSpeed = 75;
}
