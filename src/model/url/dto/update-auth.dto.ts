import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateUrlDto {
    @IsUrl()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The url to be shortened',
        example: 'https://teddydigital.io/',
      })
    link: string;
}
