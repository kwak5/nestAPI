import * as session from 'express-session'
import { Injectable } from "@nestjs/common";
import { UserDto } from "./userDto/UserDto";

@Injectable()
export class UserSessionService{
    
    get(userDto: UserDto, session:Record<string,any>){
        session.user_id = userDto.user_id;
    }

    destory(session:Record<string,any>){
        session.destory();
    }

}