import { IsAlphanumeric, IsEmail, IsNotEmpty, Length } from "class-validator";

export class UsersDto {
    @IsNotEmpty()
    username :string;

    @IsNotEmpty()
    @IsAlphanumeric()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string
}