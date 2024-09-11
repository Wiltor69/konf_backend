import { Test, TestingModule } from '@nestjs/testing';
import { OurprojectController } from './ourproject.controller';
import { OurprojectService } from './ourproject.service';

describe('OurprojectController', () => {
  let controller: OurprojectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OurprojectController],
      providers: [OurprojectService],
    }).compile();

    controller = module.get<OurprojectController>(OurprojectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
