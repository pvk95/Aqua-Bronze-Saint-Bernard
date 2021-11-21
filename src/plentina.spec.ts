import { Test, TestingModule } from '@nestjs/testing'
import { Circle } from './models/circle.model'
import { Line } from './models/line.model'
import { Rect } from './models/rect.model'
import { PlentinaController } from './plentina.controller'
import { PlentinaService } from './plentina.service'
import { Response } from 'express'

// describe('PlentinaController', () => {
//   let plentinaController: PlentinaController;

//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [PlentinaController],
//       providers: [PlentinaService],
//     }).compile();

//     plentinaController = app.get<PlentinaController>(PlentinaController);
//   });

//   describe('root', () => {
//     it('should return "Varaha Karthik Pattisapu"', () => {

//       expect(plentinaController.healthCheck(null)).toBe('Varaha Karthik Pattisapu');
//     });
//   });
// });

describe('PlentinaService', () => {
  let plentinaService: PlentinaService;

  beforeEach(async () => {
    plentinaService = new PlentinaService();
  });

  describe('doesCircleAndCircleCollide', () => {
    const circle1 = new Circle(10, 10, 1);

    describe('two colliding circles', () => {
      [
        new Circle(12, 10, 1),
        new Circle(10, 12, 1),
        new Circle(11, 11, 1),
        new Circle(10, 10, 3),
        new Circle(10, 10, 1), 
      ].forEach((circle2) => {
        it(`should return true for ${JSON.stringify(circle2)}`, () => {
          expect(circle1.collides(circle2)).toBe(true);
        });
      });
    });

    describe('two non-colliding circles', () => {
      const circle2 = new Circle(5, 5, 1);

      it(`should return false for ${JSON.stringify(circle2)}`, () => {
        expect(circle1.collides(circle2)).toBe(false);
      });
    });
  });

  describe('doesCircleAndRectCollide', () => {
    const circle = new Circle(10, 10, 2);

    describe('a colliding circle and rectangle', () => {
      const rectangle = new Rect(9, 9, 1, 1);

      it('should return true', () => {
        expect(circle.collides(rectangle)).toBe(true)
      });

      it('should return true', () => {
        expect(rectangle.collides(circle)).toBe(true);
      });
    });

    describe('a colliding circle and rectangle', () => {
      const rectangle = new Rect(10, 10, 4, 4);

      it('should return true', () => {
        expect(circle.collides(rectangle)).toBe(true)
      });

    });

    describe('a colliding circle and rectangle', () => {
      const rectangle = new Rect(10, 10, 5, 5);

      it('should return true', () => {
        expect(circle.collides(rectangle)).toBe(true)
      });

    });

    describe('a colliding circle and rectangle', () => {
      const rectangle = new Rect(10, 10, 1, 1);

      it('should return true', () => {
        expect(circle.collides(rectangle)).toBe(true)
      });

    });

    describe('a non-colliding circle and rectangle', () => {
      const rectangle = new Rect(5, 5, 2, 2);

      it('should return false', () => {
        expect(circle.collides(rectangle)).toBe(false);
      });

      it('should return false', () => {
        expect(rectangle.collides(circle)).toBe(false);
      });
    });
  });


  describe('doesCircleAndLineCollide', () => {
    const circle = new Circle(10, 10, 5);

    describe('a colling circle and line', () => {
      [
        new Line(10, 5, 20, 5), 
        new Line(10, 6, 20, 6), 
        new Line(10, 10, 20, 10), 
        new Line(0, 10, 20, 10), 
        new Line(10, 0, 10, 20),
        new Line(5, 0, 5, 20),
      ].forEach((line) => {
        it(`should return true for ${JSON.stringify(line)}`, () => {
          expect(circle.collides(line)).toBe(true);
        });
      });
    });

    describe('a non-colliding circle and a line', () => {
      const line2 = new Line(10, 4, 20, 4);

      it(`should return false for ${JSON.stringify(line2)}`, () => {
        expect(circle.collides(line2)).toBe(false);
      });
    });
    
  });

  describe('doesRectAndRectCollide', () => {
    const rectangle1 = new Rect(9, 9, 1, 1);

    describe('two colliding rectangles', () => {
      [
        new Rect(9, 9, 0.5, 0.5),
        new Rect(10, 10, 2, 2), 
        new Rect(9.5, 8.5, 1, 1), 
        new Rect(8.5, 8.5, 1, 1), 
        new Rect(8.5, 8.5, 10, 10), 
        new Rect(10, 9, 1, 1), 
        new Rect(9,10, 1, 1),
      ].forEach((rectangle2) => {  
        it(`should return true for ${JSON.stringify(rectangle2)}`, () => {
          expect(rectangle1.collides(rectangle2)).toBe(true);
        });
      });
    });
    

    describe('two non-colliding rectangles', () => {
      [
        new Rect(4, 4, 2, 2), 
        new Rect(11, 10, 1, 1), 
        new Rect(10, 11, 1, 1)
      ].forEach((rectangle2) => {
        it('should return false', () => {
          expect(rectangle1.collides(rectangle2)).toBe(false);
        });

      })
      
    });
  });


  describe('doesRectangleAndLineCollide', () => {
    const rectangle = new Rect(10, 10, 10, 5);

    describe('a colling rectangle and a line', () => {
      [
        new Line(7, 11, 7, 8), 
        new Line(7, 11, 12, 11), 
        new Line(0, 0, 10, 10),
        new Line(0, 0, 20, 20),
        new Line(10, 10, 15, 17.5)
      ].forEach((line) => {
        it(`should return true for ${JSON.stringify(line)}`, () => {
          expect(rectangle.collides(line)).toBe(true);
        });
      });
    });

    describe('a non-colliding rectangle and a line', () => {
      [
        new Line(16, 10, 18, 20),
        new Line(18, 10, 22, 20),
      ].forEach((line) => {

        it(`should return false for ${JSON.stringify(line)}`, () => {
          expect(rectangle.collides(line)).toBe(false);
        });

      });

      
    });

  });

  describe('doesLineAndLineCollide', () => {
    const line1 = new Line(0, 0, 10, 10);

    describe('two colliding lines', () => {
      [
        new Line(0, 2, 10, 20), 
        new Line(0, 0, 20, 20), 
        new Line(0, 5, 20, 5),
        new Line(5, 0, 5, 10)
      ].forEach((line) => {
        it(`should return true for ${JSON.stringify(line)}`, () => {
          expect(line1.collides(line)).toBe(true);
        });
      });
    });

    describe('two non-colliding lines', () => {
      const line2 = new Line(3, 0, 13, 10);

      it(`should return false for ${JSON.stringify(line1)}`, () => {
        expect(line1.collides(line2)).toBe(false);
      });
    });

    describe('two perpendicular lines', () => {
      const line1 = new Line(5, 0, 5, 10);
      const line2 = new Line(5, 15, 5, 20);
      const line3 = new Line(6, 0, 6, 10);

      it(`should return true for ${JSON.stringify(line1)}`, () => {
        expect(line1.collides(line2)).toBe(true);
      });

      it(`should return false for ${JSON.stringify(line1)}`, () => {
        expect(line1.collides(line3)).toBe(false);
      });
    });

    describe('two horizontal lines', () => {
      const line1 = new Line(0, 5, 10, 5);
      const line2 = new Line(15, 5, 20, 5);
      const line3 = new Line(15, 6, 20, 6);

      it(`should return true for ${JSON.stringify(line2)}`, () => {
        expect(line1.collides(line2)).toBe(true);
      });

      it(`should return false for ${JSON.stringify(line3)}`, () => {
        expect(line1.collides(line3)).toBe(false);
      });

    });

  });

});
