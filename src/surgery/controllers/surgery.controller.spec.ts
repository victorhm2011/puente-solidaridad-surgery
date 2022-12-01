import { Test, TestingModule } from '@nestjs/testing';
import { SurgeryController } from './surgery.controller';

describe('SurgeryController', () => {
  let controller: SurgeryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurgeryController],
    }).compile();

    controller = module.get<SurgeryController>(SurgeryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
