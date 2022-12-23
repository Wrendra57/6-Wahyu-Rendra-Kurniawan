const { Users } = require("../models");

class UsersRepository {
    static async getByEmail({ email }) {
        const getUser = await Users.findOne({ where: { email } });
        // console.log("getUser")
        return getUser;
    }

    static async create({ name, email, password, role }) {
        const createdUser = Users.create({
            name,
            email,
            password,
            role
        });

        return createdUser;
    }
}

module.exports = UsersRepository;