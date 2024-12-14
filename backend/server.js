const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoList = require('./models/todoList');
const router = express.Router();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todoList')
.then(()=>{
  console.log("Database Connected Successfully")
}).catch(err => {
    console.log("Failed to connect",err)
});

router.get('/fetch', async(req, res) => {
    try{
        const fetch = await todoList.find();
        res.status(200).json({
            success:true,
            data:fetch,
        });
    }catch(err){
        console.log(err)
        res.status(500).json({
          success:false,
          message:'Internal Server Error'
        })
    }
})

router.post('/add', async(req, res) => {
   const {item, quantity} = req.body;
   try{
    const add = await todoList.create({
        item,
        quantity,
    }) ;
    res.status(200).json({
         success:true,
         data:add
    })
   }catch(err){
    console.log(err)
      res.status(500).json({
        success:false,
        message:'Internal Server Error'
      })
   }
});

router.put('/update/:id', async(req, res) => {
    const id = req.params.id;
    const {item, quantity} = req.body;
    try{
    const update = await todoList.findByIdAndUpdate(id, {item, quantity});
    res.status(200).json({
        success:true,
        data:update
    })
    }catch(err){
        console.log(err)
        res.status(500).json({
          success:false,
          message:'Internal Server Error'
        })
    }
});

router.delete('/delete/:id', async(req, res) => {
    const id = req.params.id;
    try{
     await todoList.findByIdAndDelete(id);
     res.status(200).json({
        success:true,
        message:"delete successfully"
     })
    }catch(err){
        console.log(err)
        res.status(500).json({
          success:false,
          message:'Internal Server Error'
        })
    }
});

app.use('/api', router);

app.listen(2000, () => {
    console.log(`Server Running on port ${2000} `)
}); 
