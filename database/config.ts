import mongoose, { ConnectOptions } from "mongoose"

export const dbConnection = async() => {

    const mongo = `${process.env.MONGODB_CNN}`;

    try {
        await mongoose.connect(mongo, {
            useNewUrlParser: true,
        } as ConnectOptions);

        console.log('base de datos online');
    } catch (error) {
        console.log(error);
    }
}
