import { AnimationDef, Point2d, Renderer, Random } from './squire';
import { HeavyArmorSwordShield, BlackKnight } from './';

export class Entity {

  public animation: any;
  public currentState = 'idle';
  public direction = 0;
  private lastFrameTime = 0;
  private frame = 0;

  public target: Entity;
  public maxHitpoints = 100;
  public hitpoints = 100;
  public attackRange = 96;
  public accuracy = 0;
  public armor = 0;
  public maxDamage = 10;
  public minDamageMultiplier = .7;
  public walkSpeed = 50;

  constructor(public pos: Point2d) {}

  public getTarget(entities: Entity[]) {
    return entities[0];
  }

  public update(dt: number, entities: Entity[]) {
    this.target = this.getTarget(entities);
    if (this.isDead()) {
      this.switchAnim('die');
      return;
    }
    if (!this.target.pos) {
      return;
    }
    let dx = this.pos.x - this.target.pos.x;
    let dy = this.pos.y - this.target.pos.y;
    if (Math.abs(dx) < this.attackRange && Math.abs(dy) < (this.attackRange / 2)) {
      this.switchAnim('attack');
    } else {
      this.switchAnim('walk');
      this.move(this.walkSpeed * dt, this.getDirection());
    }
  }

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
      if (this.frame + 1 === frameCount && this.currentState === 'die') {

      } else if (this.frame + 1 == frameCount && this.currentState == 'attack') {
        this.dealDamageToTarget();
        this.frame = (this.frame + 1) % frameCount;
        this.lastFrameTime = now;
      } else if (this.frame + 1 == frameCount && this.currentState == 'hit') {
        this.switchAnim('idle');
        this.frame = (this.frame + 1) % frameCount;
        this.lastFrameTime = now;
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

  public takeDamage(damage: number) {
    this.hitpoints -= damage;
    if (!this.isDead()) {
      this.switchAnim('hit');
    } else {
      this.switchAnim('die');
    }
  }

  public dealDamageToTarget() {
    let targetArmor = this.target.armor;
    let armorEffect = targetArmor >= this.accuracy ? this.accuracy / targetArmor : targetArmor / this.accuracy;
    let max = this.maxDamage * armorEffect;
    let min = this.maxDamage * this.minDamageMultiplier * armorEffect;
    let calcHit = Random.between(min, max);
    console.log(targetArmor, armorEffect, max, min, calcHit);
    this.target.takeDamage(calcHit);
    if (this.target.isDead())  {
      this.switchAnim('idle');
    }
  }

  public isDead() {
    return this.hitpoints <= 0;
  }

  public render(r: Renderer) {
    this.renderAnim(r);
    if (!this.isDead()) {
      this.renderHp(r);
    }
  }

  private getDirection() {
    if (!this.target.pos) {
      return 8;
    }
    let dx = this.pos.x - this.target.pos.x;
    let dy = this.pos.y - this.target.pos.y;

    if (Math.abs(dx) + Math.abs(dy) < 1) {
      return -1;
    } else if (Math.abs(dx) - Math.abs(dy) > 5) {
      return dx < 2 ? 6 : 2;
    } else if (Math.abs(dy) - Math.abs(dx) > 5) {
      return dy < 2 ? 8 : 2;
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

  public update(dt: number, entities: Entity[]) {
    if (this.currentState === 'die') {
      return;
    }
    if (this.isDead()) {
      this.switchAnim('die');
    }
  }

  public render(r: Renderer) {
    super.render(r);
    r.circle('#00FF00', this.pos.x, this.pos.y, 2);
    // for (let seg = 0; seg < 8; seg++) {
    //   this.segmentDivider(r, seg, this.pos.x, this.pos.y, 160, (seg * 45) + 90);
    // }
  }
}

// Default Npc
// public maxHitpoints = 100;
// public hitpoints = 100;
// public attackRange = 96;
// public maxDamage = 10;
// public minDamageMultiplier = .7;
// public walkSpeed = 75;

export class BlackKnightEntity extends Entity {
  public animation = new BlackKnight();
  public maxHitpoints = 2000;
  public hitpoints = 2000;
  public attackRange = 160;
  public accuracy = 275;
  public maxDamage = 420;
  public minDamageMultiplier = .6;
  public walkSpeed = 50;
  public armor = 350;
}

export class HeavyArmorSwordShieldEntity extends Entity {
  public animation = new HeavyArmorSwordShield();
  public maxHitpoints = 2000;
  public hitpoints = 2000;
  public attackRange = 96;
  public accuracy = 350;
  public maxDamage = 335;
  public minDamageMultiplier = .7;
  public walkSpeed = 75;
  public armor = 325;

  public getTarget(entities: Entity[]) {
    return entities[1];
  }
}
