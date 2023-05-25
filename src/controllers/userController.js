// importing bcrypt for encrypting, jsonwebtoken for generate token and service to interact to database
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userService from "../services/userService.js";

// method responsible for create a user in the database
const create = async (request, response) => {
    try {
        const { firstName, lastName, email, password } = request.body;

        if(!firstName || !lastName || !email || !password) {
            response.status(400).send({
                message: "Submit all the fields required!"
            });
        }

        const userAlreadyExists = await userService.findUser(email);

        if(userAlreadyExists) {
            response.status(400).send({
                message: "User already exists!",
                userAlreadyExists: true,
            });
        } else {
            const user = await userService.create(request.body);

            if(!user) {
                return response.status(400).send({ message: "Error creating user!" });
            }

            response.status(201).send({
                message: "User successfully created!",
                user: {
                    id: user.id,
                    firstName,
                    lastName,
                    email
                }
            });
        }
    } catch (error) {
        response.status(500).send({
            message: error.message,
        });
    }
};

// method responsible for generate login for users already signed and generate tokens for each one of them
const login = async (request, response) => {
    try {
        const { email, password } = request.body;

        const user = await userService.findUser(email);

        if(!user) {
            return response.status(404).send({ message: "User not found!" });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if(!passwordIsValid) {
            return response.status(400).send({
                message: "Password does not match!",
            });
        }

        const token = jwt.sign({
            userId: user._id,
            userEmail: user.email,
            userFirstName: user.firstName,
            userLastName: user.lastName,
        }, "RANDOM-TOKEN", { expiresIn: 86400 });

        response.status(200).send({
            message: "Login successfull",
            userEmail: user.email,
            token: token,
        });

    } catch (error) {
        response.status(500).send({ message: error.message });
    }
};

// exporting methods created before
export default {
    create,
    login,
};