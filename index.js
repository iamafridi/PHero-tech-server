const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;


// MiddleWare
app.use(cors());
app.use(express.json());




app.get('/',(req,res)=>{
    res.send('Programming-Hero Technology Is Running')
})

app.listen(port,()=>{
    console.log(`Programming-Hero Server Is Running On Port : ${port}`);
})