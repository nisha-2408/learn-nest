import { Module } from "@nestjs/common";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "src/tables";
import { UserService } from "src/users/users.service";
import { UserModule } from "src/users/users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Products]),
        UserModule
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule {

}