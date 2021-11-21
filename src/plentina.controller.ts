import { Body, Controller, Get, HttpStatus, Logger, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { PlentinaService } from './plentina.service'

export interface ShapeDTO {
  x: number;
  y: number;
  radius?: number;
  width?: number;
  height?: number;
  p?: number, 
  q?: number
}

export interface CollideShapesRequest {
  firstShape: ShapeDTO;
  secondShape: ShapeDTO;
}

export interface CollideShapesResponse {
  collides: boolean;
  firstShape: ShapeDTO;
  secondShape: ShapeDTO;
}

@Controller()
export class PlentinaController {
  
  private readonly logger = new Logger(PlentinaController.name);
  constructor(private readonly plentinaService: PlentinaService) {}

  @Get()
  healthCheck(@Res({ passthrough: true }) res: Response): any {
    try {
      this.logger.log("HTTP GET /");
      res.status(HttpStatus.OK);
      return { name: this.plentinaService.healthCheck() };
    } catch (e) {
      
      this.logger.error(e)
      res.status(HttpStatus.BAD_REQUEST);
      return { error: 'Did you forget to return your name?' };
    }
  }

  @Post('/shape')
  collideShapes(@Body() req: CollideShapesRequest, @Res() res: Response) {
    
    try {
      this.logger.log("HTTP POST /shape")
      const response: CollideShapesResponse =
        this.plentinaService.doShapesCollide(req);
      res.status(HttpStatus.OK).json(response);
    } catch (e) {
      this.logger.error(e)
      res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }
}
