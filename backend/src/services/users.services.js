import UserModel from "./../models/users.models.js";

const createUser = async ({ firstname, lastname, email, password }) => {
  try {
    if (!firstname || !lastname || !email || !password) {
      throw new Error("All fields are required");
    }

    const user = await UserModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    });

    return user;
  } catch (error) {
    console.error("Error while creating user in service:", error.message);
    throw error; // Propagate the error to the caller
  }
};

export default {
  createUser,
};
