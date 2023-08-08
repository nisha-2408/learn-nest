import { IsNotEmpty, IsNumber } from "class-validator";

export class ProductsDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number

}