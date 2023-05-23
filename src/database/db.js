import mongoose from "mongoose";

export const connectToDatabase = () => {
    console.log("Connecting to database...");
    const params = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    mongoose.connect(process.env.MONGODB_CONNECTION_STRING, params).then(() => console.log("Successfully connected to database.")).catch((error) => console.log(error));
};