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

const formDelete = document.getElementById('formDelete')
const inputIdDelete = document.getElementById('idDelete')

const prod1 = document.getElementById('prod1')



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
    form.reset()
}

socketClient.on('newProduct', (products) => {
    let infoProducts = '';
    products.map((products) => {
        infoProducts += `${products.id} - ${products.title} - ${products.description} - ${products.code}  - $${products.price} - ${products.status} - ${products.stock} - ${products.category}  </br>`
    })
    prod1.innerHTML = infoProducts
})


formDelete.onsubmit = (e) => {
    e.preventDefault();
    const idDeleted = inputIdDelete.value
    console.log(idDeleted)
    socketClient.emit('delete', idDeleted);
    formDelete.reset()
}

socketClient.on('productsMenosDelete', (products) => {
    let infoProducts = '';
    products.map((products) => {
        infoProducts += `${products.id} - ${products.title} - ${products.description} - ${products.code}  - $${products.price} - ${products.status} - ${products.stock} - ${products.category}  </br>`
    })
    prod1.innerHTML = infoProducts
})