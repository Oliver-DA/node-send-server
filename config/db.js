const mongoose = require("mongoose");
require('dotenv').config({path: 'variables.env'});

const connectDB = async () => {

    try {
        await mongoose.connect( process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("DB Connected");
        
    } catch(err) {
        console.log("There was an error")
        console.log(err);
        process.exit()
    }
};

module.exports = connectDB;