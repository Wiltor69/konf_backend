import { Test, TestingModule } from '@nestjs/testing';
import { SectionaboutService } from './sectionabout.service';

describe('SectionaboutService', () => {
  let service: SectionaboutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectionaboutService],
    }).compile();

    service = module.get<SectionaboutService>(SectionaboutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
