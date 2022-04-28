class Rectangle {
  constructor(
    x,
    y,
    width,
    height,
    color = "#ffffff",
    strok = "#00FFFFFF",
    linewidth = 0
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.strok = strok;
    this.linewidth = linewidth;
    this.id = "";
    this.Selected = false;
  }

  static FromTwoPoints(
    start,
    end,
    color = "#0078d74d",
    strok = "#0078D7",
    linewidth = 1
  ) {
    let x = Math.min(start.X, end.X);
    let y = Math.min(start.Y, end.Y);
    let width = Math.abs(start.X - end.X);
    let height = Math.abs(start.Y - end.Y);
    return new Rectangle(x, y, width, height, color, strok, linewidth);
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getArea() {
    return this.width * this.height;
  }

  getPerimeter() {
    return 2 * (this.width + this.height);
  }

  getCenter() {
    return new Point(this.x + this.width / 2, this.y + this.height / 2);
  }

  getTopLeft() {
    return new Point(this.x, this.y);
  }

  getTopRight() {
    return new Point(this.x + this.width, this.y);
  }

  getBottomLeft() {
    return new Point(this.x, this.y + this.height);
  }

  getBottomRight() {
    return new Point(this.x + this.width, this.y + this.height);
  }

  getVertices() {
    return [
      this.getTopLeft(),
      this.getTopRight(),
      this.getBottomLeft(),
      this.getBottomRight(),
    ];
  }

  getEdges() {
    return [
      new Line(this.getTopLeft(), this.getTopRight()),
      new Line(this.getTopRight(), this.getBottomRight()),
      new Line(this.getBottomRight(), this.getBottomLeft()),
      new Line(this.getBottomLeft(), this.getTopLeft()),
    ];
  }

  Draw(context) {
    context.fillStyle = this.color;
    context.strokestyle = this.strok;
    context.linewidth = this.linewidth;

    context.beginPath();

    context.fillRect(this.x, this.y, this.width, this.height);
    context.strokeRect(this.x, this.y, this.width, this.height);
  }

  IsElementInArea(start, end) {
    return (
      this.getTopLeft().IsElementInArea(start, end) ||
      this.getTopRight().IsElementInArea(start, end) ||
      this.getBottomLeft().IsElementInArea(start, end) ||
      this.getBottomRight().IsElementInArea(start, end)
    );
  }
}
