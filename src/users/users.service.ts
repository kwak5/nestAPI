import { BadRequestException, Inject, Injectable} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Users } from './userDto/userEntity';
import { Repository } from 'typeorm';
import { UserDto } from './userDto/UserDto';
import { ChangeUserDto } from './userDto/ChangeUserDto';
import { UserSessionService } from './userSession.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>,
        @Inject(UserSessionService) private userSessionService: UserSessionService
        ){}

    async signUp(session:Record<string,any>, userDto : UserDto){
        const { user_id } = userDto;
        const found = await this.userRepository.findOne({where:{user_id}})
        
        if(!found){
            await this.userRepository.save(userDto);
            this.userSessionService.get(userDto,session)
            return session.user
        }else{
            throw new BadRequestException('이미 회원가입 된 아이디입니다.')
        }
        
    }

    async signIn(session:Record<string,any>, userDto:UserDto){
        const { user_id, user_password } = userDto;
        const user = await this.userRepository.findOne({where:{user_id}});
        
        if(user.user_password === user_password){
            this.userSessionService.get(userDto,session)
            return {message:"로그인 되었습니다."};
        }else{
            return {message:"해당 아이디가 존재하지 않거나 비밀번호가 틀렸습니다."}
        }
        
    }

    signOut(session:Record<string,any>){
        this.userSessionService.destory(session)
        return {message:"로그아웃 되었습니다."}
    }

    async changePassword(changeUserDto:ChangeUserDto){
        const { 
            user_id, 
            user_password, 
            change_user_password 
        } = changeUserDto;
        const found = await this.userRepository.findOne({where:{user_id}});
        if(found.user_password === user_password){
            found.user_password = change_user_password;
            await this.userRepository.save(found);
        }else{
            throw new BadRequestException('계정 정보가 일치하지 않거나 새로운 비밀번호가 유효하지 않습니다.');
        }

    }

    

    async unRegister(session:Record<string,any>, userDto : UserDto){
        const {user_id, user_password} = userDto;
        const found = await this.userRepository.findOne({where:{user_id}});

        if(found.user_password === user_password){
            this.signOut(session)
            await this.userRepository.delete({user_id});
        }else{
            throw new BadRequestException('비밀번호가 일치하지 않습니다.')
        }
    }



}
