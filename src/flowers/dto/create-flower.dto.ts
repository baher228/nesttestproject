import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateFlowerDto {
  @IsString()
  @ApiProperty({
    example: 'Name',
    required: true
  })
  name: string;
  @IsString()
  @ApiProperty({
    example: 'red',
    required: true
  })
  color: string;
  @IsNumber()
  @ApiProperty({
    example: 100,
    required: true
  })
  price: number;
}
