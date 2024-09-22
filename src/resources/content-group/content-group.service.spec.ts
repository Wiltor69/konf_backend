import { Test, TestingModule } from '@nestjs/testing';
import { ContentGroupService } from './content-group.service';

describe('ContentGroupService', () => {
  let service: ContentGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentGroupService],
    }).compile();

    service = module.get<ContentGroupService>(ContentGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
