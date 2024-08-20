export function validateUser(user: any): boolean {
    const validUser = user.id !== undefined && user.name !== undefined && user.email !== undefined
        && user.password !== undefined && user.address !== undefined && user.phone !== undefined
    
        return validUser
}

export function validateProduct(product: any): boolean {
    const validProduct = product.id !== undefined && product.name !== undefined && product.description !== undefined
        && product.imgUrl !== undefined && product.stock !== undefined && product.price !== undefined
    
        return validProduct
}