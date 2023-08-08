import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/tables/users.entity";
import { UsersDto } from "./users.dto";
import { JwtService } from "@nestjs/jwt";
import * as argon from 'argon2';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users) private readonly userScheme: Repository<Users>,
        private jwtService: JwtService
        ) {}

    async createNewUser(userData: UsersDto){
        userData.password = await argon.hash(userData.password)
        const newUser = this.userScheme.create(userData)
        return this.userScheme.save(newUser)
    }

    async logUser(username: string, password: string){
        const user = await this.userScheme.findOne({where: {username: username}})
        if(!user){
            throw new NotFoundException('User does not exist')
        }
        if(!await argon.verify(user.password, password)){
            throw new UnauthorizedException('Wrong Password')
        }
        const payload = {id: user.id, uname: user.username, email: user.email}
        return {
            acc_token: await this.jwtService.signAsync(payload)
        }
    }

    async getAllUsers(){
        const allUsers = await this.userScheme.query("SELECT * FROM users")
        return allUsers
    }

    decodeToken(token: string) {
        return this.jwtService.decode(token)
    }
    
}