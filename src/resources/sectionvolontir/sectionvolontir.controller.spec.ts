import { Test, TestingModule } from '@nestjs/testing';
import { SectionvolontirController } from './sectionvolontir.controller';
import { SectionvolontirService } from './sectionvolontir.service';

describe('SectionvolontirController', () => {
  let controller: SectionvolontirController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionvolontirController],
      providers: [SectionvolontirService],
    }).compile();

    controller = module.get<SectionvolontirController>(SectionvolontirController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
