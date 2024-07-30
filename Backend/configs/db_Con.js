import mongoose from "mongoose"


export const db_Con = async(connection) => {

    await mongoose.connect(connection)
    console.log("Database connected...")

}