import { Injectable } from '@nestjs/common';
import { CreateOurprojectDto } from './dto/create-ourproject.dto';
import { UpdateOurprojectDto } from './dto/update-ourproject.dto';

@Injectable()
export class OurprojectService {
  create(createOurprojectDto: CreateOurprojectDto) {
    return 'This action adds a new ourproject';
  }

  findAll() {
    return `This action returns all ourproject`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ourproject`;
  }

  update(id: number, updateOurprojectDto: UpdateOurprojectDto) {
    return `This action updates a #${id} ourproject`;
  }

  remove(id: number) {
    return `This action removes a #${id} ourproject`;
  }
}
