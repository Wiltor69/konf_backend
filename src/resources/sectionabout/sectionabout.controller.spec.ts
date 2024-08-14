import { Test, TestingModule } from '@nestjs/testing';
import { SectionaboutController } from './sectionabout.controller';
import { SectionaboutService } from './sectionabout.service';

describe('SectionaboutController', () => {
  let controller: SectionaboutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionaboutController],
      providers: [SectionaboutService],
    }).compile();

    controller = module.get<SectionaboutController>(SectionaboutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
