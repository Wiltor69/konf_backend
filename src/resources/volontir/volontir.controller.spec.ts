import { Test, TestingModule } from '@nestjs/testing';
import { VolontirController } from './volontir.controller';
import { VolontirService } from './volontir.service';

describe('VolontirController', () => {
  let controller: VolontirController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VolontirController],
      providers: [VolontirService],
    }).compile();

    controller = module.get<VolontirController>(VolontirController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
