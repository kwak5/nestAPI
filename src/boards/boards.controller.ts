import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('/boards')
export class BoardsController {
    constructor(private boardsService:BoardsService){}

    @Get('/')
    getAllBoards(){
        return this.boardsService.findAllBoards();
    }

    @Post('/')
    createBoard(
        @Body('title') title:string,
        @Body('description') description:string
        ){
        return this.boardsService.createBoard(title,description);
    }

    @Get('/:id')
    findBoardById(@Param('id') id : string){
        return this.boardsService.findById(id);
    }

    @Patch('/:id')
    findBoardByIdAndUpdate(
        @Param('id') id:string,
        @Body('title') title?:string,
        @Body('description') description?:string
        ){
            return this.boardsService.findByIDAndUpdate(id,title,description);
        }

    @Delete('/:id')
    deleteBoard(@Param('id') id:string){
        this.boardsService.deleteBoard(id)
    }
}
