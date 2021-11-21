import { Circle } from './circle.model';
import { Rect } from './rect.model';
import { distanceBetween, Point, Shape, Type } from './shape.model'

export class Line implements Shape {
  readonly center: Point;
  readonly end: Point;
  readonly type: Type;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    
    this.center = <Point><any>{ x: x1, y: y1 };
    this.end = <Point><any>{ x: x2, y: y2 };
    this.type = Type.LINE;
  }
  /**
   * Caclculates the coefficients that define the line y = mx + c
   * @param line The Line shape
   * @returns The calculated coefficients
   */

  static getCoefficients(line: Line): [number, number] {

    let m = (line.end.y - line.center.y) / (line.end.x - line.center.x);
    let c = (line.end.x * line.center.y - line.center.x * line.end.y) / (line.end.x - line.center.x);

    if (m == Infinity || m == -Infinity) m = Infinity;

    return [m, c]

  }

  /**
   * Returns whether two float values are close within a given margin
   * @param val1 Float value 1
   * @param val2 Float value 2
   * @param epsilon Margin of error
   * @returns a boolean whether the given values are close or not
   */

  static isClose(val1: number, val2: number, epsilon: number = 1e-3): boolean {

    return Math.abs(val1 - val2) <= epsilon;

  }

  /**
   * Checks whether a line intersects a line segment. 
   * @param line The user provided line shape
   * @param point1 First of the two points that define a line segment
   * @param point2 Second of the twon points that define a line segment
   * @returns a boolean whether the given line intersects the line segment.
   */

   static isIntersect(line: Line, point1: Point, point2: Point): boolean {

    const coeff1 = Line.getCoefficients(line);
    const coeff2 = Line.getCoefficients(new Line(point1.x, point1.y, point2.x, point2.y))

    if (coeff1[0] != Infinity && coeff2[0] != Infinity) {

      if (!Line.isClose(coeff1[0], coeff2[0])) { 
        // Not parallel 
        const x: number = (coeff2[1] - coeff1[1]) / (coeff1[0] - coeff2[0])
        const y: number = coeff1[0] * x + coeff1[1]

        const xmin: number = Math.min(point1.x, point2.x)
        const xmax: number = Math.max(point1.x, point2.x)
        const ymin: number = Math.min(point1.y, point2.y)
        const ymax: number = Math.max(point1.y, point2.y)

        return (xmin <= x + 1e-3 && x <= xmax + 1e-3 && ymin <= y + 1e-3 && y <= ymax + 1e-3)

      } else if (Line.isClose(coeff1[1], coeff2[1])) {
        // Parallel lines with same coefficients => Same line
        return true;
      } else {
        // Parallel lines with different coefficients => No intersection
        return false;
      }
    } else if (coeff1[0] == Infinity && coeff2[0] == Infinity) {
      // Perpendicular lines
      return line.center.x === point1.x;
    } else {

      // One perpendicular line

      let m: number
      let c: number
      let xc: number

      // One perpendicular line
      if (coeff1[0] == Infinity) {
        m = coeff2[0];
        c = coeff2[1];
        xc = line.center.x;
      } else {
        m = coeff1[0];
        c = coeff1[1];
        xc = point1.x;
      } 

      const x: number = xc
      const y: number = m*xc + c

      const xmin: number = Math.min(point1.x, point2.x)
      const xmax: number = Math.max(point1.x, point2.x)
      const ymin: number = Math.min(point1.y, point2.y)
      const ymax: number = Math.max(point1.y, point2.y)

      return (xmin <= x + 1e-3 && x <= xmax + 1e-3 && ymin <= y + 1e-3 && y <= ymax + 1e-3)
    }
  }

  /**
   * Checks whether the Line shape collides with other shapes {Line, Rectangle, Circle}
   * @param other Other shape
   * @returns a boolean whether or not they collide
   */

  collides(other: Shape): boolean {
    switch (other.type) {
      case Type.LINE:
        
        const line = Line.fromShape(other);

        const coeff1 = Line.getCoefficients(this);
        const coeff2 = Line.getCoefficients(line);

        if (coeff1[0] != Infinity && coeff2[0] != Infinity) {
          if (!Line.isClose(coeff1[0], coeff2[0])) return true;
          else if (!Line.isClose(coeff1[1], coeff2[1])) return false;
          else return true;
        
        } else if (coeff1[0] == Infinity && coeff2[0] == Infinity) {

          return this.center.x === line.center.x;
        } else {
          return true;
        }
      
      case Type.CIRCLE:
        
        const circle: Circle = Circle.fromShape(other);
        return circle.collides(this);

      case Type.RECT:    
        
        const rect: Rect = Rect.fromShape(other)
        return rect.collides(this)

      default:
        throw new Error(`Invalid shape type!`);
    }
  }

  /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Line object
   */
  static fromShape(other: Shape): Line {
    const polymorph = <any>other;
    if (!polymorph.end) {
      throw new Error('Shape is invalid! Cannot convert to a Line');
    }

    return new Line(
      polymorph.center.x, 
      polymorph.center.y,
      polymorph.end.x,
      polymorph.end.y,
    );
  }
}
