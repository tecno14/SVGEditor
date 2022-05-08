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
    this._IsMoving = false;
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
    ctx.shadowColor = "rgba(0, 0, 255, 0.5)";
    this._IsMoving = moveToTempPosition;
    if (!moveToTempPosition) {
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    } else {
      // Selected
      // ctx.shadowOffsetX = 0;
      // ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 10;
      ctx.fillStyle = ShadeColor(this.color, 20);
      ctx.beginPath();
      ctx.arc(this._temp_x, this._temp_y, this.radius, 0, Math.PI * 2, false);
    }
    ctx.fill();
  }

  IsElementInArea(rect) {
    var x = this.x;
    var y = this.y;

    if (this._IsMoving) {
      x = this._temp_x;
      y = this._temp_y;
    }

    if (rect == null) return false;

    var distX = Math.abs(x - rect.x - rect.width / 2);
    var distY = Math.abs(y - rect.y - rect.height / 2);

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

  IsPointInElement(Px, Py) {
    var x = this.x;
    var y = this.y;

    if (this._IsMoving) {
      x = this._temp_x;
      y = this._temp_y;
    }

    return Math.sqrt(Math.pow(Px - x, 2) + Math.pow(Py - y, 2)) <= this.radius;
  }

  TempPosition(x, y) {
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
