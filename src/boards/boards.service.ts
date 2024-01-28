import { Injectable } from '@nestjs/common';
import { Board } from './board';
import {v1 as uuid} from 'uuid'

@Injectable()
export class BoardsService {
    private boardRepository : Board[] = [];

    createBoard(title:string,description:string):Board{
        const board : Board = {
            id:uuid(),
            title,
            description,
        }
        this.boardRepository.push(board)
        return board;
    }

    findById(id:string):Board{
        return this.boardRepository.find((b)=>b.id===id)
        
    }

    findAllBoards():Board[]{
        return this.boardRepository;
    }

    findByIDAndUpdate(id:string,title?:string,description?:string):Board{
        const board : Board = this.findById(id);
        board.title = title;
        board.description = description;
        return board;
    }
    deleteBoard(id:string):void{
        this.boardRepository = this.boardRepository.filter((b)=>b.id !== id);
    }

}

