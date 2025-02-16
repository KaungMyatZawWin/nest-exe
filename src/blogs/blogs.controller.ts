import { Controller, Get } from '@nestjs/common';

@Controller('blogs')
export class BlogsController {
    @Get()
    getAllBlog(){
        return "This is get all blog list route."
    }

    @Get(':id')
    getBlog(){
        return 'This is get blog by id route.'
    }
}
