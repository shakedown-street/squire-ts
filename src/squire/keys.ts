export class Keys {

  private _pressed: any = {};

  public LEFT = 65;
  public UP = 87;
  public RIGHT = 68;
  public DOWN = 83;
  public SPACE = 32;

  public isDown(keyCode: number) {
    return this._pressed[keyCode];
  }

  public onKeydown(event: any) {
    this._pressed[event.keyCode] = true;
  }

  public onKeyup(event: any) {
    delete this._pressed[event.keyCode];
  }
}
