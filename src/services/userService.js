// importing model with database fields
import { userModel } from "../models/userModel.js";

// methods to create a user and find a user in the database
const create = (body) => userModel.create(body);
const findUser = (email) => userModel.findOne({ email: email });

// exporting methods created before
export default {
    create,
    findUser,
};