import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ChangeUserDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    user_id:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    user_password:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    change_user_password:string;
}