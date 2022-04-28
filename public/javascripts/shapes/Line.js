class Line {
  constructor(x1, y1, x2, y2, color = "#ffffff") {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.id = "";
    this.Selected = false;
  }

  Draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
  }

  IsPointInElement(x, y) {
    return (
      Math.sqrt(Math.pow(x - this.x1, 2) + Math.pow(y - this.y1, 2)) <=
      Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2))
    );
  }

  IsElementInArea(start, end) {
    return (
      Math.sqrt(
        Math.pow(start.X - this.x1, 2) + Math.pow(start.Y - this.y1, 2)
      ) <=
        Math.sqrt(
          Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2)
        ) &&
      Math.sqrt(Math.pow(end.X - this.x1, 2) + Math.pow(end.Y - this.y1, 2)) <=
        Math.sqrt(
          Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2)
        )
    );
  }
}
