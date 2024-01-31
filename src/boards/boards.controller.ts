import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardDto} from './dto/BoardDto';
import { Board } from './dto/BoardEntity';

@Controller('/boards')
export class BoardsController {
    constructor(
        @Inject(BoardsService)private boardService:BoardsService
    ){}
    @Get('')
    getBoards(): Promise<Board[]>{
        return this.boardService.findAllBoard();
    }
    
    @Get('/:id')
    getBoardById(@Param('id') id:number):Promise<Board>{
        
        return this.boardService.findBoardById(id)

    }
    
    @Post('/')
    async createBoard(@Body() boardDto:BoardDto):Promise<Board>{
        const board = await this.boardService.createBoard(boardDto);
        return board;

    }

    @Patch('/:id')
    async getBoardByIdAndUpdate(
        @Param('id') id: number,
        @Body() boardDto:BoardDto
    ) :Promise<Board> {

        const board = await this.boardService.findBoardByIdAndUpdate(id, boardDto);
        return board;

    }

    @Delete('/:id')
    async deleteBoard(
        @Param('id') id:number
    ){
        
        this.boardService.deleteBoard(id);

    }


}
