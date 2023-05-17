const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const qr = require('qrcode');
import { ethers } from "ethers";
// const morgan = require('morgan');

connectDB();

const PORT = process.env.PORT || 3000;


const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());


app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
 


app.use('/', require('./routes/signup'));
app.use('/Consumer', require('./routes/Consumer'));
app.use('/Manufacturer', require('./routes/Manufacturer'));


app.get('/api/qr/:uuid',(req,res)=>{

  const itemId = Number(req.params.uuid);
  let itemName,status,dateOFManufacture
  
  const contract = new ethers.Contract(
    contractAddress,
    abi
  );
        
  const res = contract.getItemInfo(itemId);  
     
      
   res.render('auth',{status:status,code: itemCode,name: itemName,date: dateOFManufacture});
})




app.listen(PORT, function(){
    console.log(`server is running on port ${PORT}.`);
})