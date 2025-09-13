import { Flower } from "../entities/flowers.entity";

export class FlowerResponseDto {
    name!: string;
    color!: string;
    price!: number;
    createdAt!: Date;
    updatedAt!: Date;
    constructor(entity: Flower) {
        this.name = entity.name;
        this.color = entity.color;
        this.price = entity.price;
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
      }
  }
  