import { IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UrlsDto {
  @ApiProperty({
    description: 'The unique identifier of the URL',
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'The original link',
    example: 'https://example.com',
  })
  @IsString()
  link: string;

  @ApiProperty({
    description: 'The shortened link with the hostname',
    example: 'http://localhost:3000/shortHash',
  })
  @IsString()
  linkShort: string;

  @ApiProperty({
    description: 'The number of times the URL has been accessed',
    example: 5,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  contAccess: number;

  @ApiProperty({
    description: 'The creation date of the URL record',
    example: '2024-08-16T12:34:56.789Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'The last updated date of the URL record',
    example: '2024-08-16T12:34:56.789Z',
  })
  @IsDate()
  updatedAt: Date;
}