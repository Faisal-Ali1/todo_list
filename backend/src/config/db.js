const mongoose = require('mongoose');

async function main(){
    try{
        await mongoose.connect('mongodb+srv://fa4492977:ali%40123@codingadda.ln0ajxn.mongodb.net/todo_list')
        console.log('connected to db');
        
    }
    catch(err){
        console.log('Error: ' , err.message);
        
    }
    
}

module.exports = main;