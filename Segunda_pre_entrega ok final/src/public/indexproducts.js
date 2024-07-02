const socketClient = io()

const form = document.getElementById('form')
const inputName = document.getElementById('title')
const inputDescription = document.getElementById('description')
const inputCode = document.getElementById('code')
const inputPrice = document.getElementById('price')
const inputStatus = document.getElementById('status')
const inputStock = document.getElementById('stock')
const inputCategory = document.getElementById('category')


const formDelete = document.getElementById('formDelete')
const inputIdDelete = document.getElementById('idDelete')

const prod1 = document.getElementById('prod1')



form.onsubmit = (e) => {
    e.preventDefault();
    const name = inputName.value
    const description = inputDescription.value
    const code = parseInt(inputCode.value)
    const price = parseInt(inputPrice.value)
    const status = inputStatus.value
    const stock =parseInt(inputStock.value)
    const category = inputCategory.value
   

    const product = {
        name,
        description,
        code,
        price,
        status,
        stock,
        category
        
    };

    socketClient.emit('newProduct', product);
    form.reset()
}

socketClient.on('newProduct', (products) => {
    let infoProducts = '';
    products.map((products) => {
        infoProducts += `${products._id} - ${products.name} - ${products.description} - ${products.code}  - $${products.price} - ${products.status} - ${products.stock} - ${products.category}  </br>`
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
        infoProducts += `${products._id} - ${products.name} - ${products.description} - ${products.code}  - $${products.price} - ${products.status} - ${products.stock} - ${products.category}  </br>`
    })
    prod1.innerHTML = infoProducts
})