class Diablo {

  public canvas: any;
  public ctx: any;
  public size: any;
  public center: any;
  public renderer: Renderer;
  public stateManager: StateManager;

  constructor() {
    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
    this.size = new Dimension2d(this.canvas.width, this.canvas.height);
    this.center = new Point2d(this.size.w / 2, this.size.h / 2);
    this.renderer = new Renderer(this.ctx);
    this.stateManager = new StateManager();
    this.stateManager.state = new TurdState();
  }

  public run(): void {
    requestAnimationFrame(() => {
      this.run();
    });
    this.renderer.clear('black', 0, 0, this.size.w, this.size.h);
    this.stateManager.update();
    this.stateManager.render(this.renderer);
  }
}

interface Star {

  point: Point3d;
  size: number;

}

abstract class State {

  public abstract init(): void;

  public abstract render(r: Renderer): void;

  public abstract update(): void;

  public abstract end(): void;

}

class TurdState extends State {

  public stars: Star[] = [];
  public fov: number = 800;

  constructor() {
    super();
  }

  private random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  public init() {
    for (let i = 0; i < 10000; i++) {
      this.stars.push({point: new Point3d(this.random(-800, 800), this.random(-600, 600), this.random(-100000, 100000)), size: this.random(1, 2)});
    }
    console.log(this.stars);
  }

  public render(r: Renderer) {
    let i = this.stars.length;
    while(i--) {
      let star = this.stars[i];
      let scale = this.fov / (this.fov + star.point.z);
      let x2d = star.point.x * scale + diablo.size.w / 2;
      let y2d = star.point.y * scale + diablo.size.h / 2;
      if (x2d >= 0 && x2d <= diablo.size.w && y2d >= 0 && y2d <= diablo.size.h) {
        r.circle('white', x2d, y2d, 1);
        // r.circle('white', x2d, y2d, star.size);
        star.point.z -= 1;
        if (star.point.z < -this.fov) star.point.z += 2 * this.fov;
      }
    }
  }

  public update() {

  }

  public end() {

  }
}

class StateManager {

  private _state: State;

  get state() {
    return this._state;
  }

  set state(value: State) {
    this._state = value;
    this._state.init();
  }

  constructor() { }

  public update(): void {
    if (!this.stateIsValid()) { return; }
    try {
      this._state.update();
    } catch(e) {
      console.warn(e);
    }
  }

  public render(r: Renderer): void {
    if (!this.stateIsValid()) { return; }
    try {
      this._state.render(r);
    } catch(e) {
      console.warn(e);
    }
  }

  public stateIsValid(): boolean {
    return !(this._state === undefined || this._state === null);
  }

}

class Renderer {

  constructor(public ctx: any) {

  }

  public clear(color: string, x: number, y: number, w: number, h: number) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }

  public circle(color: string, x: number, y: number, radius: number) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}

class Dimension2d {

  constructor(public w: number, public h: number) {

  }
}

class Point2d {

  constructor(public x: number, public y: number) {

  }
}

class Point3d {

  constructor(public x: number, public y: number, public z: number) {

  }
}

const diablo = new Diablo();
window.onload = () => {
  diablo.run();
}
