import { IsNotEmpty } from "class-validator";

export class ChangeUserDto{
    @IsNotEmpty()
    user_id:string;

    @IsNotEmpty()
    user_password:string;

    @IsNotEmpty()
    change_user_password:string;
}