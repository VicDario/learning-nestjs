import { Controller, Get } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get('/test')
  getCategories() {
    return 'Ehhhhhh ehhhhhhhhh';
  }
}
