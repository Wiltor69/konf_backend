import { Test, TestingModule } from '@nestjs/testing';
import { VolontirService } from './volontir.service';

describe('VolontirService', () => {
  let service: VolontirService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VolontirService],
    }).compile();

    service = module.get<VolontirService>(VolontirService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
