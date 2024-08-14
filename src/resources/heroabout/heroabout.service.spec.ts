import { Test, TestingModule } from '@nestjs/testing';
import { HeroaboutService } from './heroabout.service';

describe('HeroaboutService', () => {
  let service: HeroaboutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroaboutService],
    }).compile();

    service = module.get<HeroaboutService>(HeroaboutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
