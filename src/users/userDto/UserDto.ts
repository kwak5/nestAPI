import { IsNotEmpty, IsString, MaxLength, MinLength, minLength } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    user_id:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    user_password:string;

}