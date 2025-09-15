import { Test, TestingModule } from '@nestjs/testing';
import { FlowersService } from './flowers.service';
import { FlowerRepository } from './repositories/flowers.repository';
import { EntityManager } from '@mikro-orm/core';
import { Flower } from './entities/flowers.entity';
import { CreateFlowerDto } from './dto/create-flower.dto';

describe('FlowersService', () => {
  let service: FlowersService;
  let flowerRepository: FlowerRepository;
  let em: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlowersService,
        {
          provide: FlowerRepository,
          useValue: {
            findAll: jest.fn(),
          },
        },
        {
          provide: EntityManager,
          useValue: {
            create: jest.fn(),
            persistAndFlush: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FlowersService>(FlowersService);
    flowerRepository = module.get<FlowerRepository>(FlowerRepository);
    em = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of flowers', async () => {
    const flowers = [
      {
        id: 1,
        name: 'Rose',
        color: 'Red',
        price: 10,
      },
    ];
    jest.spyOn(flowerRepository, 'findAll').mockResolvedValue(flowers as any);

    const result = await service.findAll();
    expect(result).toEqual(flowers);
    expect(flowerRepository.findAll).toHaveBeenCalled();
  });

  it('should create a new flower', async () => {
    const dto: CreateFlowerDto = { name: 'Lily', color: 'White', price: 15 };
    const mockFlower = { id: 2, ...dto, createdAt: new Date(), updatedAt: new Date() };

    jest.spyOn(em, 'create').mockReturnValue(mockFlower as any);
    jest.spyOn(em, 'persistAndFlush').mockResolvedValue(undefined);

    const result = await service.create(dto);
    expect(em.create).toHaveBeenCalledWith(Flower, dto);
    expect(em.persistAndFlush).toHaveBeenCalledWith(mockFlower);
    expect(result).toEqual({
      name: 'Lily',
      color: 'White',
      price: 15,
      createdAt: mockFlower.createdAt,
      updatedAt: mockFlower.updatedAt,
    });
  });
});
