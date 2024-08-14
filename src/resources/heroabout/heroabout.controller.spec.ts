import { Test, TestingModule } from '@nestjs/testing';
import { HeroaboutController } from './heroabout.controller';
import { HeroaboutService } from './heroabout.service';

describe('HeroaboutController', () => {
  let controller: HeroaboutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroaboutController],
      providers: [HeroaboutService],
    }).compile();

    controller = module.get<HeroaboutController>(HeroaboutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
