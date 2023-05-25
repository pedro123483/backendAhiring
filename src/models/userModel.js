// importing mongoose to interact with database and bcrypt for encrypting the password
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// defining our model, wich contains all the information needed in the database
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// encrypting password before saving to database
userSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 10);

    next();
});

// exporting model created before
export const userModel = mongoose.model("user", userSchema);