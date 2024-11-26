import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyrequisitService } from './currencyrequisit.service';

describe('CurrencyrequisitService', () => {
  let service: CurrencyrequisitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyrequisitService],
    }).compile();

    service = module.get<CurrencyrequisitService>(CurrencyrequisitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
