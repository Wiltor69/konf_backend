import { Controller } from '@nestjs/common';
import { ContentGroupService } from './content-group.service';

@Controller('content-group')
export class ContentGroupController {
  constructor(private readonly contentGroupService: ContentGroupService) {}
}
