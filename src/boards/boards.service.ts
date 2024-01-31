import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardDto } from './dto/BoardDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './dto/BoardEntity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board) 
        private boardRepository : Repository<Board>
    ){}

    async createBoard(boardDto:BoardDto): Promise<Board>{
        const Board = this.boardRepository.create(boardDto);
        return await this.boardRepository.save(Board);

    }

    async findAllBoard(): Promise<Board[]>{
        return this.boardRepository.find();
    }

    async findBoardById(id:number): Promise<Board>{
        return await this.boardRepository.findOne({where:{id}})
    }

    async findBoardByIdAndUpdate(id:number,boardDto:BoardDto): Promise<Board> {
        const {title,description} = boardDto;
        const found = await this.boardRepository.findOne({where:{id}});
        found.title = title;
        found.description = description;
        return await this.boardRepository.save(found);

    }
    
    async deleteBoard(id:number):Promise<void> {
        await this.boardRepository.delete(id);
    }
    

}

