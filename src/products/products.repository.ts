import { Product } from "./entities/product.entity";


export class ProductsRepository {
    private products: Product[] = []

    findAll(page: number = 1, limit: number = 5) : Product[] {
        const startIndex = (page - 1) * limit
        return this.products.slice(startIndex, startIndex+limit)
    }

    findOne(id: string): Product {
        const product = this.products.find(product => product.id == parseInt(id))
        return product
    }

    update(id: string, updateProduct: Product): number {
        const index = this.products.findIndex(prod => prod.id == parseInt(id))

        this.products[index].description = updateProduct.description
        this.products[index].name = updateProduct.name
        this.products[index].imgUrl = updateProduct.imgUrl
        this.products[index].price = updateProduct.price
        this.products[index].stock = updateProduct.stock

        return this.products[index].id
    }

    save(newProduct: Product): number {
        this.products.push(newProduct)
        return newProduct.id
    }

    delete(id: string): number {
        const index = this.products.findIndex(prod => prod.id == parseInt(id))
        this.products.splice(index, 1)

        return parseInt(id)
    }
}