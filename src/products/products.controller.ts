import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./products.service";
import { title } from "process";
import { ProductsDto } from "./products.dtos";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Post()
    addProducts(@Body() allData: ProductsDto ): any {
        const result = this.productService.insertProduct(allData)
        return result
    }

    @Get()
    getAllProducts(){
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