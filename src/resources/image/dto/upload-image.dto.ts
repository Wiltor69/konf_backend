import { ApiProperty } from '@nestjs/swagger';

//This dto need for upload file of image and saving him in remote image repository
// and then generate url for access

export class UploadImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;

  // @ApiProperty({
  //   description: 'A brief description of the image',
  //   example: 'A beautiful landscape',
  // })
  // description: string;
}
