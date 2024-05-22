const socketClient = io()

const form = document.getElementById('form')
const inputTitle = document.getElementById('title')
const inputDescription = document.getElementById('description')
const inputCode = document.getElementById('code')
const inputPrice = document.getElementById('price')
const inputStatus = document.getElementById('status')
const inputStock = document.getElementById('stock')
const inputCategory = document.getElementById('category')
const inputThumbnails = document.getElementById('thumbnails')

const products = document.getElementById('products')

form.onsubmit = (e) => {
    e.preventDefault();
    const title = inputTitle.value 
    const description = inputDescription.value 
    const code = inputCode.value
    const price = inputPrice.value
    const status = inputStatus.value 
    const stock = inputStock.value
    const category = inputCategory.value
    const thumbnails = inputThumbnails.value

    const product = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };
    
    socketClient.emit('newProduct', product);
}

socketClient.on('newProduct', (products) => {
    let infoProducts = '';
    products.map((prod) => {
        infoProducts += `${prod.name} - $${prod.price} </br>`
    })
    products.innerHTML = infoProducts
})
