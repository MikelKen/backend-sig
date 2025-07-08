import { Test, TestingModule } from '@nestjs/testing';
import { DetailsOrderController } from './details-order.controller';
import { DetailsOrderService } from './details-order.service';

describe('DetailsOrderController', () => {
  let controller: DetailsOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailsOrderController],
      providers: [DetailsOrderService],
    }).compile();

    controller = module.get<DetailsOrderController>(DetailsOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
