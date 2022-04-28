class Point {
  constructor(x, y, radius = 5, color = "#ffffff", id = "") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.id = id;
    // this.Selected = false;
    this._temp_x = 0;
    this._temp_y = 0;
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

  Draw(ctx, moveToTempPosition = false) {
    if (!moveToTempPosition) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    } else {
      ctx.fillStyle = ShadeColor(this.color, 20);
      ctx.beginPath();
      ctx.arc(this._temp_x, this._temp_y, this.radius, 0, Math.PI * 2, false);
    }
    ctx.fill();
  }

  IsElementInArea(rect) {
    // return (
    //   Math.sqrt(
    //     Math.pow(start.X - this.x, 2) + Math.pow(start.Y - this.y, 2)
    //   ) <= this.radius &&
    //   Math.sqrt(Math.pow(end.X - this.x, 2) + Math.pow(end.Y - this.y, 2)) <=
    //     this.radius
    // );

    if (rect == null) return false;

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

  IsPointInElement(x, y) {
    return (
      Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) <=
      this.radius
    );
  }

  // Move(x, y) {
  //   this.x += x;
  //   this.y += y;
  // }

  // Shift(x, y) {
  //   this._temp_x = this.x + x;
  //   this._temp_y = this.y + y;
  // }

  TempPosition(x, y) {
    // this._temp_x += x;
    // this._temp_y += y;
    this._temp_x = this.x + x;
    this._temp_y = this.y + y;
  }

  ResetTempPosition() {
    this._temp_x = this.x;
    this._temp_y = this.y;
  }

  SaveTempPosition() {
    this.x = this._temp_x;
    this.y = this._temp_y;
  }
}
