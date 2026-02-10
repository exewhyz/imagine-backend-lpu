import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        if(!URI){
            throw new Error("Please add MONGODB_URI in your env file")
        }
        mongoose.connection.on("connected", () => {
            console.log("Connected to DB")
        })
        mongoose.connection.on("error", (error) => {
            console.log(`Failed after connecting DB ${error.message}`)
        })

        await mongoose.connect(URI);
    } catch (error) {
        console.log(`Failed connecting DB ${error.message}`)
    }
}

export default connectDB;