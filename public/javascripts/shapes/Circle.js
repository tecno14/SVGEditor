class Circle {
  constructor(x, y, radius = 20, fill = "#ffffff", stroke = "#000000") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fill = fill;
    this.stroke = stroke;
    this.id = "";
    this.Selected = false;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

  Draw(ctx) {
    ctx.fillStyle = this.fill;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.stroke();
  }

  IsPointInElement(x, y) {
    return (
      Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) <=
      this.radius
    );
  }

  IsElementInArea(rect) {
    // return (
    //   Math.sqrt(
    //     Math.pow(start.X - this.x, 2) + Math.pow(start.Y - this.y, 2)
    //   ) <= this.radius &&
    //   Math.sqrt(Math.pow(end.X - this.x, 2) + Math.pow(end.Y - this.y, 2)) <=
    //     this.radius
    // );

    var distX = Math.abs(this.x - rect.x - rect.width / 2);
    var distY = Math.abs(this.y - rect.y - rect.height / 2);

    if (distX > rect.width / 2 + this.radius) {
      return false;
    }
    if (distY > rect.height / 2 + this.radius) {
      return false;
    }

    if (distX <= rect.width / 2) {
      return true;
    }
    if (distY <= rect.height / 2) {
      return true;
    }

    var dx = distX - rect.width / 2;
    var dy = distY - rect.height / 2;
    return dx * dx + dy * dy <= this.radius * this.radius;
  }
}
