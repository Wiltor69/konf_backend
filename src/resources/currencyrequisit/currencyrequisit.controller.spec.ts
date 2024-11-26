import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyrequisitController } from './currencyrequisit.controller';
import { CurrencyrequisitService } from './currencyrequisit.service';

describe('CurrencyrequisitController', () => {
  let controller: CurrencyrequisitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyrequisitController],
      providers: [CurrencyrequisitService],
    }).compile();

    controller = module.get<CurrencyrequisitController>(CurrencyrequisitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
