const mongoose = require('mongoose');
const uri = process.env.MONGO_URL;

const DB = async () => {
    try{
        await mongoose.connect(uri);
        console.log('MongoDb connected Successfully')
    } catch(err) {
        console.log("Mongodb connection error: ",err)
    }
}

module.exports = DB;