import { Test, TestingModule } from '@nestjs/testing';
import { WorthController } from './worth.controller';
import { WorthService } from './worth.service';

describe('WorthController', () => {
  let controller: WorthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorthController],
      providers: [WorthService],
    }).compile();

    controller = module.get<WorthController>(WorthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
