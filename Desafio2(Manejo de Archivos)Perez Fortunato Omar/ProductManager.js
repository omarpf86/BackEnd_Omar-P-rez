const fs = require('fs') 
class ProductManager {


    constructor(path) {
        this.path = path
        this.products = [] /*si no lo creo no puedo llamar a this products en los metodos que siguen.. ademas es necesario llamarlo en el metodo addproduct ya que products en los metodos anteriores esta definido en forma local*/ 
    }
    
    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, 'UF8' )
                return JSON.parse(products)
            } else return[]
        }catch (error){console.log(error)}
     
    }

    async createProduct(product) {
        try {
            this.products =[...await this.getProducts()]
            this.products.push(product)
            await fs.promises.writeFile(this.path,JSON.stringify(this.products,null))
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


    async getId() {
        try {
            let maxId = 0
            this.products = [...await this.getProducts()]
            this.products.map((product) => {
                if (product.id > maxId) { maxId = product.id }
            })
            return maxId
        } catch { throw new Error("Hubo un error en la obtenciòn del Id") }    
    }


    async getProductById(idproduct) {
        try{
        const products = await this.getProducts()
            const product = (products.find((x) => x.id === idproduct))
            return product
        } catch (error) { throw new Error("Producto no encontrado") }  
    }

    async updateProduct(old_id, code, title, description, price, stock) {
        try {
            const product = await this.getProductById(old_id)
            const newproduct = {
                code,
                title,
                description,
                price,
                thumbnail: "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000000/2219_1.jpg",
                stock,

            }

            Object.assign(newproduct, product.id)

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
        } catch { throw new Error("El Producto no fue creado") }

    }   


   async deleteProduct(idproduct) {
        try { 
            this.products = await this.getProducts()
            const product = this.products.findIndex((x) => x.id === idproduct)
            if (product) {
                this.products.splice(product, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(products))
            } else {console.log("El producto no existe")}    
        } catch (error) { throw new Error("El Producto no pudo ser borrado") }
    }


}
