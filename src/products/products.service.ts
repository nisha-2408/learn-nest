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
    products: Product[] = [
        {
            id: 1,
            title: 'Iphone 14 pro max',
            description: 'some dummy description',
            price: 799.90
        }
    ];

    insertProduct(productDto: ProductsDto) {
      const newProduct = this.productSchema.create(productDto)
      return this.productSchema.save(newProduct)
    }

    async returnAllProducts(): Promise<Product[]> {
      const allProducts = await this.productSchema.query("SELECT * FROM PRODUCTS")
      console.log(allProducts)
      return [...allProducts]
    }

    returnSingleProduct(prodId: number): Product {
        const [item, index] = this.findProduct(prodId)
        return {...item}
    }

    updateProduct(productId: number, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(productId);
        const updatedProduct = { ...product };
        if (title) {
          updatedProduct.title = title;
        }
        if (desc) {
          updatedProduct.description = desc;
        }
        if (price) {
          updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
      }
    
      deleteProduct(prodId: number) {
          const index = this.findProduct(prodId)[1];
          this.products.splice(index, 1);
      }
    
      private findProduct(id: number): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === id);
        const product = this.products[productIndex];
        if (!product) {
          throw new NotFoundException('Could not find product.');
        }
        return [product, productIndex];
      }
}