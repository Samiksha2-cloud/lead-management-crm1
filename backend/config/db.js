const mongoose =require('mongoose');
// imports mongoose library . 
// below line  declares an asynchronous function named connectDB.
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);// prints a success msg to the console.
    }catch(error) {
        console.error(`DB Connection Error:, ${error.message}`

        );
        process.exit(1);// if theres an error it will show 1 and the application stops tell the db connection failed. 
    }
    };

module.exports = connectDB;// exports the connectDB dunction so it can be used in other files.