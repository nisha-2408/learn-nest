import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/tables/users.entity";
import { JwtModule } from "@nestjs/jwt";
import { JWTConstants } from "src/constants/user.constants";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        JwtModule.register({
            global: true,
            secret: JWTConstants.secret,
            signOptions: {
                expiresIn: JWTConstants.expiresIn
            }
        })
    ],
    controllers: [UsersController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}