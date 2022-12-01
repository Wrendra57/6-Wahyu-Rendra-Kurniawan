const carService = require('../services/carService');

const create = async (req, res) => {
    const { name, tipemobil, price } = req.body;

    console.log(req.user.id)
    const { status, status_code, message, data } = await carService.create({
        name,
        tipemobil,
        price,
        createdBy: req.user.id,
        image: req.file
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getAllCars = async (req, res) => {
    const { status, status_code, message, data } = await carService.getAll();
    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getDetailCar = async (req, res) => {
    const { id } = req.params;
    const { status, status_code, message, data } = await carService.getById({ id });
    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const updatedCar = async (req, res) => {
    const { id } = req.params;
    const { name, tipemobil, price } = req.body;
    const { status, status_code, message, data } = await carService.update({
        id,
        name,
        price,
        tipemobil,
        image: req.file,
        id_creator: req.user.id
    });
    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const deleteCarsById = async (req, res) => {
    const { id } = req.params;
    const { status, status_code, message, data } = await carService.deleteById({
        id,
        userId: req.user.id
    });
    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = { create, getAllCars, deleteCarsById, getDetailCar, updatedCar };
