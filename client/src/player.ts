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
  public name: string = '';
  public maxHitpoints = 5000;
  public hitpoints = 5000;
  public attackRange = 96;
  public attackSpeed = 2;
  public accuracy = 326;
  public armor = 315;
  public maxDamage = 315;
  public minDamageMultiplier = .9;
  public walkSpeed = 96;

  constructor(connection: Connection, pos: Point2d) {
    super(pos);
    this.connection = connection;
    this.connection.socket.onmessage = (message: any) => {
      let parsed = JSON.parse(message.data);
      if (parsed.type === 'player') {
        let data = JSON.parse(parsed.data);
        console.log(data);
        this.pos = new Point2d(data.position.x, data.position.y);
        this.name = data.name;
      }
    };
  }

  public render(r: Renderer) {
    super.render(r);
    r.text(this.name, this.pos.x - 48, this.pos.y - 48, 'white');
    // for (let seg = 0; seg < 8; seg++) {
    //   this.segmentDivider(r, seg, this.pos.x, this.pos.y, 160, (seg * 45) + 90);
    // }
    // for (let seg = 0; seg < 8; seg++) {
    //   this.segmentDivider(r, (seg * 45) + 22.5, this.pos.x, this.pos.y, 120, (seg * 45) + 22.5);
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
    if (this.isWalking()) {
      this.switchAnim('walk');
      this.move(this.walkSpeed * dt, this.getDirection());
    } else {
      this.switchAnim('idle');
    }
  }
}
