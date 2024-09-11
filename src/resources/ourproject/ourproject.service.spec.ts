import { Test, TestingModule } from '@nestjs/testing';
import { OurprojectService } from './ourproject.service';

describe('OurprojectService', () => {
  let service: OurprojectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OurprojectService],
    }).compile();

    service = module.get<OurprojectService>(OurprojectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
