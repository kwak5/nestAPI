import { Body, Controller, Delete, Get, Inject, Patch, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './userDto/UserDto';
import { Users } from './userDto/userEntity';
import { ChangeUserDto } from './userDto/ChangeUserDto';

@Controller('users')
export class UsersController {
    constructor(@Inject(UsersService) private usersService: UsersService){}

    @Post('/signUp')
    async signUp( 
        @Body()userDto:UserDto,
        @Req() req: any
        ){
        return this.usersService.signUp(req,userDto);
    }

    @Post('/signin')
    async signIn( 
        @Body()userDto:UserDto,
        @Req() req: any,
        ){
        
        return this.usersService.signIn(req,userDto);
    }
    @Get('/signOut')
    signOut(
        @Req() req: any
    ){
        return this.usersService.signOut(req)
    }
    
    @Patch('/changePassword')
    async changePassword(
        @Req() req: any,
        @Body() changeUserDto: ChangeUserDto,
    ){
        return this.usersService.changePassword(req, changeUserDto)
    }
    
    @Delete('/unRegister')
    async unRegister(
        @Req() req: any,
        @Body() userDto: UserDto,
    ){
        return this.usersService.unRegister(req, userDto)
    }

}
