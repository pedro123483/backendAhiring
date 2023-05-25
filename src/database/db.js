// mongoose required for interacting with database
import mongoose from "mongoose";

// function responsible for connecting to mongodb atlas database
export const connectToDatabase = () => {
    console.log("Connecting to database...");
    const params = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    mongoose.connect(process.env.MONGODB_CONNECTION_STRING, params).then(() => console.log("Successfully connected to database.")).catch((error) => console.log(error));
};