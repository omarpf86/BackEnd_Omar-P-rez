import factory from '../daos/factory.js';
const { userDao } = factory;
import UserResDTO from '../dtos/user.res.dto.js';

export default class UserRepository {
    constructor() {
        this.dao = userDao;
    }



    async getById(id) {
        try {
            const user = await this.dao.getUserById(id);
            if (user.role=="user"){
            const userDTO = new UserResDTO(user);
            return (userDTO)
            } else return user
        } catch (error) {
            throw new Error(error);
        }
    };
}