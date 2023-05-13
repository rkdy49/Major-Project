const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect('mongodb://localhost:27017/userdb');
    const db = mongoose.connection;

    db.on('error',(err) => {
        console.log(err);

    })

    db.once('open',()=>{
        console.log('Database connection Established!');
    })
}

module.exports = connectDB;