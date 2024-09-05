import { Test, TestingModule } from '@nestjs/testing';
import { OurprojectsController } from './ourprojects.controller';
import { OurprojectsService } from './ourprojects.service';

describe('OurprojectsController', () => {
  let controller: OurprojectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OurprojectsController],
      providers: [OurprojectsService],
    }).compile();

    controller = module.get<OurprojectsController>(OurprojectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
