import { Body, Controller, Delete, Get, Inject, Patch, Post, Req,  Session,  ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './userDto/UserDto';
import { ChangeUserDto } from './userDto/ChangeUserDto';

@Controller('users')
export class UsersController {
    constructor(@Inject(UsersService) private usersService: UsersService){}

    @Post('/signUp')
    async signUp( 
        @Body(ValidationPipe)userDto:UserDto,
        @Session() session: Record<string,any>
        ){
        return this.usersService.signUp(session,userDto);
    }

    @Post('/signin')
    async signIn( 
        @Body(ValidationPipe)userDto:UserDto,
        @Session() session: Record<string,any>
        ){
        
        return this.usersService.signIn(session,userDto);
    }
    @Get('/signOut')
    signOut(
        @Session() session: Record<string,any>
    ){
        return this.usersService.signOut(session)
    }
    
    @Patch('/changePassword')
    async changePassword(
        @Body(ValidationPipe) changeUserDto: ChangeUserDto,
    ){
        return this.usersService.changePassword(changeUserDto)
    }
    
    @Delete('/unRegister')
    async unRegister(
        @Session() session: Record<string,any>,
        @Body(ValidationPipe) userDto: UserDto,
    ){
        return this.usersService.unRegister(session, userDto)
    }

}
