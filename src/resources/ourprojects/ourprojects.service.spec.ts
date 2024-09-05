import { Test, TestingModule } from '@nestjs/testing';
import { OurprojectsService } from './ourprojects.service';

describe('OurprojectsService', () => {
  let service: OurprojectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OurprojectsService],
    }).compile();

    service = module.get<OurprojectsService>(OurprojectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
