import {
  Connection,
  Renderer,
  Point2d,
} from './squire';

import {
  Entity,
  BlackKnight,
  HeavyArmorSwordShield,
} from './';

export class Player extends Entity {

  public connection: Connection;

  public animation = new HeavyArmorSwordShield();
  public maxHitpoints = 5000;
  public hitpoints = 5000;
  public attackRange = 96;
  public attackSpeed = 1.25;
  public accuracy = 326;
  public armor = 315;
  public maxDamage = 315;
  public minDamageMultiplier = .9;
  public walkSpeed = 75;

  constructor(connection: Connection, pos: Point2d) {
    super(pos);
    this.walkTo = this.pos;
    this.connection = connection;
  }

  public render(r: Renderer) {
    super.render(r);
    // for (let seg = 0; seg < 8; seg++) {
    //   this.segmentDivider(r, seg, this.pos.x, this.pos.y, 160, (seg * 45) + 90);
    // }
  }

  public update(dt: number, entities: Entity[]) {
    if (this.isDead()) {
      this.switchAnim('die');
      return;
    }
    if (this.currentState === 'attack' || this.currentState === 'magic_lightning') {
      return;
    }
    let walkDx = this.pos.x - this.walkTo.x;
    let walkDy = this.pos.y - this.walkTo.y;
    let walkWithinX = Math.abs(walkDx) <= 10;
    let walkWithinY = Math.abs(walkDy) <= 10;
    // let targetDx = this.pos.x - this.target.pos.x;
    // let targetDy = this.pos.y - this.target.pos.y;
    // let targetWithinX = Math.abs(targetDx) < this.attackRange;
    // let targetWithinY = Math.abs(targetDy) < (this.attackRange / 2);
    // let targetAlive = !this.target.isDead();
    if (this.walkTo && (!walkWithinX || !walkWithinY)) {
      this.currentState = 'walk';
      this.move(this.walkSpeed * dt, this.getDirection());
    // } else if (targetWithinX && targetWithinY && targetAlive) {
    //   this.switchAnim('attack');
    } else {
      this.currentState = 'idle';
    }
  }
}
