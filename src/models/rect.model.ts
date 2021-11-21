import { Circle } from './circle.model';
import { Line } from './line.model';
import { Point, Shape, Type } from './shape.model'

export class Rect implements Shape {
  readonly center: Point;
  readonly width: number;
  readonly height: number;
  readonly type: Type;

  constructor(x: number, y: number, width: number, height: number) {
    this.center = <Point>{ x, y };
    this.type = Type.RECT;
    this.width = width;
    this.height = height;
  }

  /**
   * Cecks whether the Rectangle shape intersects with other shape objects
   * @param other User provided shape object
   * @returns a boolean whether the rectangle collides with other shape object
   */

  collides(other: Shape): boolean {
    switch (other.type) {
      case Type.CIRCLE:

        const circle: Circle = Circle.fromShape(other);
        return circle.collides(this);
        
      case Type.RECT:
      
        const rect: Rect = Rect.fromShape(other);

        const l1: Point = <Point>{x: this.center.x - this.width / 2, y: this.center.y + this.height / 2}
        const r1: Point = <Point>{x: this.center.x + this.width / 2, y: this.center.y - this.height / 2}

        const l2: Point = <Point>{x: rect.center.x - rect.width / 2, y: rect.center.y + rect.height / 2}
        const r2: Point = <Point>{x: rect.center.x + rect.width / 2, y: rect.center.y - rect.height / 2}

        if (l1.x > r2.x || l2.x > r1.x) return false;

        else if (r2.y > l1.y || r2.y > l2.y) return false;

        return true;

      case Type.LINE:

        const line: Line = Line.fromShape(other);

        const point1: Point = <Point>{x: this.center.x - this.width / 2, y: this.center.y - this.height / 2}
        const point2: Point = <Point>{x: this.center.x - this.width / 2, y: this.center.y + this.height / 2}
        const point3: Point = <Point>{x: this.center.x + this.width / 2, y: this.center.y + this.height / 2}
        const point4: Point = <Point>{x: this.center.x + this.width / 2, y: this.center.y - this.height / 2}

        if (Line.isIntersect(line, point1, point2)) return true;
        else if (Line.isIntersect(line, point2, point3)) return true;
        else if (Line.isIntersect(line, point3, point4)) return true;
        else if (Line.isIntersect(line, point4, point1)) return true;
        else return false;

      default:
        throw new Error(`Invalid shape type!`);
    }
  }

  /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Rect object
   */
  static fromShape(other: Shape): Rect {
    const polymorph = <any>other;
    if (!polymorph.width || !polymorph.height) {
      throw new Error('Shape is invalid! Cannot convert to a Rectangle');
    }

    return new Rect(
      polymorph.center.x,
      polymorph.center.y,
      polymorph.width,
      polymorph.height,
    );
  }
}
