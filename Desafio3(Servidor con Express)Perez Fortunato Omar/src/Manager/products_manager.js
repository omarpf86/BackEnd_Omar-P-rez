import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';


export default class ProductManager {


    constructor(path) {
        this.path = path
        this.products = [] 
    }
    
    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, 'utf8' )
                return JSON.parse(products)
            } else return[]
        }catch (error){console.log(error)}
     
    }

    async createProduct(obj) {
        try {
            this.products = [...await this.getProducts()]
            const product = {
                id: uuidv4(),
                ...obj
            };
            this.products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null))
            return product
        } catch (error) { throw new Error ("Hubo un error en la creación del producto en el archivo") }
    }



async addProduct(code, title, description, price, stock) {
        try {
            const product = {
                id: this.getId() + 1,
                code,
                title,
                description,
                price,
                thumbnail: "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000000/2219_1.jpg",
                stock,

            }
        
            this.products = [...await this.getProducts()]

            if (this.products.length == 0) { await this.createProduct(product) }

            else if (this.products.length !== 0) {
                let y = true
                for (let i = 0; i < this.products.length; i++) {
                    const codeold = this.products[i].code
                    const codenew = product.code
                    if (codeold == codenew) {
                        console.log("Producto existente")
                        y = false
                    }
                }
                if (y) { await this.createProduct(product) }
            }
        } catch { throw new Error("El Producto no fue creado")  }   
        
    } 


    async getProductById(id) {
        try{
        const products = await this.getProducts()//no uso this products= porque si no ya estaria cargando el array.
            const product = (products.find((x) => x.id === id))
            if (!product) return null
            return product
        } catch (error) { throw new Error("Producto no encontrado") }  
    }

    async updateProduct(obj,id) {
        try {
            this.products = [...await this.getProducts()]
            console.log(this.products)
            let product = await this.getProductById(id)
            console.log(product)
            if (!product) return null
            product = { ...product, ...obj }
            console.log(product)
            this.products = this.products.filter((x) => x.id !== id)
            this.products.push(product)

            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null))
            return product

        } catch { throw new Error("El Producto no fue actualizado") }

    }   


   async deleteProduct(id) {
        try { 
            this.products = [...await this.getProducts()]
            if (this.products.length > 0) { 
                const productExist = await this.getProductById(id)
            if (productExist) {
                this.products=this.products.filter((x)=>x.id !==id)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products))
                return productExist} 
            } else return null  
        } catch (error) { throw new Error("El Producto no pudo ser borrado") }
    }


}
