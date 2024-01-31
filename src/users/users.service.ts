import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './userDto/userEntity';
import { Repository } from 'typeorm';
import { UserDto } from './userDto/UserDto';
import { ChangeUserDto } from './userDto/ChangeUserDto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users> 
        ){}

    async signUp(req:any, userDto : UserDto){
        const { user_id } = userDto;
        const found = await this.userRepository.findOne({where:{user_id}})
        
        if(!found){
            await this.userRepository.save(userDto);
            req.session.user = user_id
            return req.session.user
        }else{
            return {message:"계정이 이미 있습니다."}
        }
        
    }
    
    checkSession(req:any){
        return req.session.user
    }

    async signIn(req:any, userDto:UserDto){
        const { user_id, user_password } = userDto;
        const user = await this.userRepository.findOne({where:{user_id}});
        
        if(user.user_password === user_password){
            req.session.user = user.user_id;
            return {message:"log in"};
        }else{
            return {message:"Not matched"}
        }
        
    }

    signOut(req:any){
        req.session.destroy();
    }

    async changePassword(req:any, changeUserDto:ChangeUserDto){
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
            return {message:"Not matched password"}
        }

    }

    

    async unRegister(req:any, userDto : UserDto){
        const {user_id, user_password} = userDto;
        const found = await this.userRepository.findOne({where:{user_id}});

        if(found.user_password === user_password){
            this.signOut(req)
            await this.userRepository.delete({user_id})
        }
    }



}
