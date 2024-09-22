import { Test, TestingModule } from '@nestjs/testing';
import { ContentGroupController } from './content-group.controller';
import { ContentGroupService } from './content-group.service';

describe('ContentGroupController', () => {
  let controller: ContentGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentGroupController],
      providers: [ContentGroupService],
    }).compile();

    controller = module.get<ContentGroupController>(ContentGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
