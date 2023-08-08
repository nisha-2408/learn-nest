import { Module } from "@nestjs/common";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "src/tables";

@Module({
    imports: [
        TypeOrmModule.forFeature([Products])
    ],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule {

}