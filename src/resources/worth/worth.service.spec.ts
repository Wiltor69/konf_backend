import { Test, TestingModule } from '@nestjs/testing';
import { WorthService } from './worth.service';

describe('WorthService', () => {
  let service: WorthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorthService],
    }).compile();

    service = module.get<WorthService>(WorthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
