import { Test, TestingModule } from '@nestjs/testing';
import { SectionvolontirService } from './sectionvolontir.service';

describe('SectionvolontirService', () => {
  let service: SectionvolontirService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectionvolontirService],
    }).compile();

    service = module.get<SectionvolontirService>(SectionvolontirService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
