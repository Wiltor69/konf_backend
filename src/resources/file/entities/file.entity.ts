import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type FileDocument = File & Document;

@Schema()
export class File {
  @ApiProperty({
    description: 'This is filename',
  })
  @Prop({ required: true })
  filename: string;

  @ApiProperty({
    description: 'This is contentType',
  })
  @Prop({ required: true })
  contentType: string;
  @ApiProperty({
    description: 'This is size',
  })
  @Prop({ required: true })
  size: number;
  @ApiProperty({
    description: 'This is upload date',
  })
  @Prop({ required: true })
  uploadDate: Date;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
export const FileSchema = SchemaFactory.createForClass(File);
