const { Cars } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
        const getAllCar = await Cars.findAll({
            where: {
                deletedAt: {
                    [Op.eq]: null
                }
            }

        });
        return getAllCar;
    }

    static async getByID({ id }) {
        const getCar = await Cars.findOne({
            where: {
                id: id,
                deletedAt: {
                    [Op.eq]: null
                }
            }
        });
        // console.log(getCar)
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

    static async updateByID({ name, price, tipemobil, image, id, updatedBy }) {
        const updateCar = await Cars.update(
            {
                name,
                price,
                tipemobil,
                image,
                updatedBy
            },
            { where: { id } }
        );
        return updateCar;
    }
}

module.exports = carRepository;