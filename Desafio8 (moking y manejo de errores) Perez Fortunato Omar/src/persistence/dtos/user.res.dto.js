export default class UserResDTO {
    constructor(user) {
        console.log("el user en el dto es ", user)
        this.nombre = user.first_name;
        this.apellido = user.last_name;
        this.email = user.email;
        this.edad = user.age;
        this.cid = user.cart._id.toString()
    }
}