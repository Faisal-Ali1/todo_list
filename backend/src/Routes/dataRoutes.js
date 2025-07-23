const express = require('express');
const data = require('../Modals/dataSchema')

const dataRouter = express.Router();



// creating task
dataRouter.post('/create', async (req, res) => {

    if (!req.body)
        return res.status(401).send('enter task');

    let message = req.body.message;

    await data.create({ message });
    res.status(200).send('Task created');

})

// fetching all tasks
dataRouter.get('/getalltask', async (req, res) => {

    try {
        const allTask = await data.find({});
        res.status(200).send(allTask);
    }
    catch (err) {
        res.status(400).send('Error: ', err.message)
    }
})

// fetching single task
dataRouter.get('/getsingletask/:id' , async(req , res) => {
    try{

        const { id} = req.params
       const singleTask = await data.findById(id);
       res.status(200).send(singleTask);
    }
    catch(err){
        console.log('Error: ' , err.message);
        
    }
})

// updating tast
dataRouter.patch('/update/:id', async (req, res) => {

    try{
       
        if (!req.body)
        return res.status(400).send('enter task for updation');

    const { id } = req.params;
    const {message} = req.body;
    
    await data.findByIdAndUpdate(id, {message});

    res.status(200).send('Task updated sucessfully');
    }
    catch(err){
        console.log('Error: ' , err);
        
    }
})

// deleting task
dataRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    await data.findByIdAndDelete({ _id: id })

    res.status(200).send('Task deleted sucessfully')
})

module.exports = dataRouter;