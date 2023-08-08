import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { UserService } from "./users.service";
import { UsersDto } from "./users.dto";
import { Response } from "express";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @Post()
    createUser(@Body() userData: UsersDto) {
        return this.userService.createNewUser(userData)
    }

    @Post('login')
    async loginUser(@Body('uname') username: string, @Body('passwd') password: string, @Res({passthrough: true}) res: Response){
        const result = await this.userService.logUser(username, password)
        res.cookie('token', result.acc_token)
    }

    @Get()
    getUsers(){
        return this.userService.getAllUsers()
    }
}