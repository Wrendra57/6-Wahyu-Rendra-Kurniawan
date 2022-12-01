const { Cars } = require('../models');

class carRepository {
    static async create({ name, tipemobil, price, image, createdBy }) {
        console.log("repo")
        console.log(createdBy)
        const createdProduct = await Cars.create({
            name,
            tipemobil,
            price,
            image,
            createdBy
        });
        return createdProduct;
    }

    static async getAll() {
        const getAllCar = await Cars.findAll();
        return getAllCar;
    }

    static async getByID({ id }) {
        const getCar = await Cars.findOne({ where: { id } });
        return getCar;
    }

    static async deleteById({ id, userId }) {
        console.log(userId)
        const deleteCar = await Cars.update(
            {
                deletedAt: new Date().getTime(),
                deletedBy: userId
            },
            { where: { id } });
        return deleteCar;
    }

    static async updateByID({ name, price, tipemobil, id_creator, image, id }) {
        const updateCar = await Cars.update(
            {
                name,
                price,
                tipemobil,
                image,
                id_creator
            },
            { where: { id } }
        );
        return updateCar;
    }
}

module.exports = carRepository;