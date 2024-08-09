const express =require('express');
const app = express();

require('dotenv').config();
const Port=process.env.PORT||3000;

//middleware
app.use(express.json());

//routes
const blog=require('./routes/blog');
//mount
app.use('/api/v1',blog);

const connectWithDb = require('./config/database');
connectWithDb();
app.listen(Port,()=>{
    console.log(`Server running on port ${Port}`); 
})
app.get('/',(req,res)=>{
    res.send(`<h1>Welcome!</h1>`)
})
