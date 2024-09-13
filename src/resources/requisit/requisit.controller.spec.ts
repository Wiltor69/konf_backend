import { Test, TestingModule } from '@nestjs/testing';
import { RequisitController } from './requisit.controller';
import { RequisitService } from './requisit.service';

describe('RequisitController', () => {
  let controller: RequisitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequisitController],
      providers: [RequisitService],
    }).compile();

    controller = module.get<RequisitController>(RequisitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
