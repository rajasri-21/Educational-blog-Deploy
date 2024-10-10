const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOURL || "mongodb+srv://scrajasrisneha:12345@in-aws.x1bhg.mongodb.net/?retryWrites=true&w=majority&appName=IN-AWS")

const connection = mongoose.connection;
connection.on('connected', () =>{
    console.log("DB Connected")
})

connection.on('error', () => console.log("DB Error"))

module.exports = mongoose


