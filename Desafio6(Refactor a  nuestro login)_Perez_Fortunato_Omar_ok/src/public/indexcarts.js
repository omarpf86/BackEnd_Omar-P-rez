const socket = io()

const formListProducts = document.getElementById('displayList')

const formCreateCart = document.getElementById('createCart')
const listProducts = document.getElementById('listProducts')

const boxIdCart = document.getElementById('cartIdentification')

const formGetProduct = document.getElementById('form1')
const inputIdProduct = document.getElementById('idP')
const listProductsInCart = document.getElementById('listAddProducts')

const formProductDelete = document.getElementById('form2')
const inputIdProductDelete = document.getElementById('idProductDelete')

const formClearCart = document.getElementById('cleanCart')

const deleteCart = document.getElementById('deleteCart')



//OBTENCION DE LISTA DE PRODUCTOS----------------------------------------------------
formListProducts.onsubmit = (e)=>{
    e.preventDefault();
    socket.emit('getListproducts')
}



socket.on('listProducts1', (products) => {
    let infoProducts = '';
    products.map((products) => {
        infoProducts += `${products._id} - ${products.name} - ${products.description}  - $${products.price}   </br>`
    })
    listProducts.innerHTML = infoProducts
})

//CREAR CARRITO--------------------------------------------------------

formCreateCart.onsubmit = (e) => {
    e.preventDefault();
    socket.emit('createCart');
}


socket.on('newCart', (idcart) => {
    let idCart = idcart
    boxIdCart.innerHTML = idCart
})



//AGREGAR PRODUCTO A CARRITO----------------------------------------------------------
console.log("el box es ", boxIdCart)
formGetProduct.onsubmit = (e) => {
    e.preventDefault();
    const idProduct = inputIdProduct.value
    const idCart = boxIdCart.textContent
    console.log ("valores para agregar producto",idProduct,idCart)
    let addProduct = { 
        idC: idCart,
        idP: idProduct
    }

    socket.emit('addProduct1', addProduct);
    form.reset()
}
  

socket.on('addProduct2', (productCart) => {
    let infoProducts = '';
    productCart.map((x) => {
        infoProducts += `${x.product._id} - ${x.product.name} - ${x.product.description} - ${x.product.price} - ${x.quantity} </br>`
    })
    listProductsInCart.innerHTML = infoProducts
})

//BORRAR PRODUCTO DEL CARRITO-------------------------------------------------------

formProductDelete.onsubmit = (e) => {
    e.preventDefault();
    const idProductDelete = inputIdProductDelete.value
    const idCart = boxIdCart.textContent
    const productDelete = { 
        idC: idCart,
        idP: idProductDelete
    }
    socket.emit('deleteProduct', productDelete);
    formDelete.reset()
}

socket.on('deleteProduct2', (products) => {
    let infoProducts = '';
    products.map((x) => {
        infoProducts += `${x.product._id} - ${x.product.name} - ${x.product.description} - ${x.product.price} - ${x.quantity} </br>`
    })
    listProductsInCart.innerHTML = infoProducts
})

//lIMPIAR CARRITO--------------------------------------------------------------------
formClearCart.onsubmit = (e) => {
    e.preventDefault();
    const idCart = boxIdCart.textContent
    console.log("el id para borrar es", idCart)
    socket.emit('cleanCart', idCart);
}

socket.on('emptyCart', (cart) => {
    let infoCart = cart
    listProductsInCart.innerHTML = infoCart
})

//ELIMINAR CARRITO------------------------------------------------------------------
deleteCart.onsubmit = (e) => {
    e.preventDefault();
    const idCart = boxIdCart.textContent
    console.log("el id para borrar es", idCart)
    socket.emit('deleteCart', idCart);
}

socket.on('cart does not exist', (x) => {
    const infoCart = x
    if (x == "") {
        listProductsInCart.innerHTML = ""
        inputIdProduct.value = "" 
        boxIdCart.innerHTML = infoCart 
    }
    
})
