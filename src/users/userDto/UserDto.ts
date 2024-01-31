import { IsNotEmpty } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    user_id:string;

    @IsNotEmpty()
    user_password:string;

}