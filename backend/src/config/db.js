const mongoose = require('mongoose');

async function main(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
        console.log('connected to db');
        
    }
    catch(err){
        console.log('Error: ' , err.message);
        
    }
    
}

module.exports = main;