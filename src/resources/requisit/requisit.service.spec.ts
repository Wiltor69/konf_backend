import { Test, TestingModule } from '@nestjs/testing';
import { RequisitService } from './requisit.service';

describe('RequisitService', () => {
  let service: RequisitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequisitService],
    }).compile();

    service = module.get<RequisitService>(RequisitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
