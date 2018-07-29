export class FractalRenderer {

  constructor(public ctx: any) { }

  private horizontalLine(x: number, y: number, len: number, time = 0) {
    if (len < 1) {
      return;
    }

    let f = Math.sqrt(2);

    this.ctx.beginPath();
    this.ctx.moveTo(x - len / 2, y);
    this.ctx.lineTo(x + len / 2, y);
    this.ctx.stroke();

    // For each horizontal, draw two vertical lines on the sides
    this.verticalLine(x - len / 2, y, len / f);
    this.verticalLine(x + len / 2, y, len / f);
  }

  private verticalLine(x: number, y: number, len: number, time = 0) {
    if (len < 1) {
      return;
    }

    let f = Math.sqrt(2);

    this.ctx.beginPath();
    this.ctx.moveTo(x, y - len / 2);
    this.ctx.lineTo(x, y + len / 2);
    this.ctx.stroke();

    // For each vertical, draw two horizontal lines on the sides
    this.horizontalLine(x, y - len / 2, len / f);
    this.horizontalLine(x, y + len / 2, len / f);
  }

  public lines(x: number, y: number, len: number, time = 0) {
    this.horizontalLine(x, y, len, time);
  }

}
