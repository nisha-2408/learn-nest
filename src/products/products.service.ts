import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "src/tables";
import { Repository } from "typeorm";
import { ProductsDto } from "./products.dtos";

@Injectable()
export class ProductService {
    constructor(
      @InjectRepository(Products) private readonly productSchema: Repository<Products>
      ) {}

    insertProduct(productDto: ProductsDto, userId: number) {
      
      const newProduct = this.productSchema.create(productDto)
      return this.productSchema.save(newProduct)
    }

    async returnAllProducts(): Promise<Products[]> {
      const allProducts = await this.productSchema.query("SELECT * FROM PRODUCTS")
      //console.log(allProducts)
      return [...allProducts]
    }

    async returnSingleProduct(prodId: number): Promise<Products> {
      const item = await this.findById(prodId)
        //const [item, index] = this.findProduct(prodId)
      if(!item){
        throw new NotFoundException('Does not exist')
      }
      return {...item}
    }

    async updateProduct(productId: number, title: string, desc: string, price: number) {
        const product = await this.findById(productId);
        let result: any
        if(product){
          if(title){
            result = this.productSchema.update({id: productId}, {name: title})
          } else if(desc){
            result = this.productSchema.update({id: productId}, {description: desc})
          } else if(price) {
            result = this.productSchema.update({id: productId}, {price: price})
          }
        } else {
          throw new NotFoundException('Does not exist')
        }
        return result 
      }
    
      async deleteProduct(prodId: number) {
        const result = await this.productSchema.delete(prodId)
        if(result.affected == 0){
          throw new NotFoundException('Does not exist')
        }
        return result
      }
    
      private async findById(id: number): Promise<Products> {
        const item = await this.productSchema.findOne({
          where: {
            id: id
          }
        })
        return item
      }
}