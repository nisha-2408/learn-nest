import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Header, Req } from "@nestjs/common";
import { ProductService } from "./products.service";
import { title } from "process";
import { ProductsDto } from "./products.dtos";
import { AuthGaurd } from "src/gaurds/auth.gaurd";
import { UserService } from "src/users/users.service";
import { Request } from "express";

@UseGuards(AuthGaurd)
@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly userService: UserService
        ){}

    @Post()
    addProducts(@Body() allData: ProductsDto, @Req() req: Request): any {
        const token = req.headers.authorization.split(' ')[1]
        const userId = this.userService.decodeToken(token)['id']
        const result = this.productService.insertProduct(allData, parseInt(userId))
        return result
    }

    @Get()
    getAllProducts(@Req() req: Request){
        const token = req.headers.authorization.split(' ')[1]
        const userId = this.userService.decodeToken(token)['id']
        console.log(this.userService.decodeToken(token))
        return this.productService.returnAllProducts()
    }
    @Get(':id')
    getProduct(@Param('id') id: string ){
        const prodId: number = parseInt(id)
        return this.productService.returnSingleProduct(prodId)

    }

    @Patch(':id')
    updateProduct(@Param('id') id: string, @Body('title') prodTitle: string, @Body('description') prodDescription: string, @Body('price') prodPrice: number) {
        const prodId: number = parseInt(id)
        return this.productService.updateProduct(prodId, prodTitle, prodDescription, prodPrice)
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        const prodId: number = parseInt(id)
        return this.productService.deleteProduct(prodId)
    }
}