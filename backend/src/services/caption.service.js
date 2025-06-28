import CaptionModel from "../models/captan.models.js";

const createCaption = async ({
    fullname,
    email,
    password,
    vehicle,
}) => {
    if (
        !fullname?.firstname ||
        !fullname?.lastname ||
        !email ||
        !password ||
        !vehicle?.color ||
        !vehicle?.plate ||
        !vehicle?.capacity ||
        !vehicle?.vehicleType
    ) {
        throw new Error("All fields are required");
    }

    const caption = await CaptionModel.create({
        fullname,
        email,
        password,
        vehicle
    });

    return caption;
};

export default {
    createCaption,
};
