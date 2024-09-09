class ProductManager {


    constructor() {
        this.products = []
    }

    addProduct(code, title, description, price, stock) {
        const product = {
            id: this.getId() + 1,
            code,
            title,
            description,
            price,
            thumbnail: "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000000/2219_1.jpg",
            stock,
            
        }


        if (this.products.length == 0) { this.products.push(product) }

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
            if (y) { this.products.push(product) }
        }

    } 


    getId() {
        let maxId = 0
        this.products.map((product) => {
            if (product.id > maxId) { maxId = product.id }
        })
        return maxId
    }


    getProductById(idproduct) {
        const product = this.products.find((product) => product.id === idproduct)
        if (product) { return product }
        else console.log("Not found")


    }

    getProducts() {
        return this.products;
    }


}

const mp = new ProductManager();
mp.addProduct(124, "Vino", "Blanco", 1000, 25);
mp.addProduct(125, "Cerveza", "Negra", 2000, 10);
console.log(mp.getProducts());
mp.addProduct(124,"Vino","Rosa",1000,10)
