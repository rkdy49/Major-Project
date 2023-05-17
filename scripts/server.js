const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const qr = require('qrcode');
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

    let itemCode = Number(req.params.uuid);
    let itemName,status,dateOFManufacture

    async function main (){
        const SupplyChainContractFactory = await hre.ethers.getContractFactory('ItemManager');
        const SupplyChainContract = await SupplyChainContractFactory.attach(CONTRACT_ADDRESS);
        
        itemName =  await SupplyChainContract.getItemIdentifier(itemCode);
        console.log(itemName);

        // let location = await SupplyChainContract.getItemLocation(itemCode);
        // console.log(location);

         status = await SupplyChainContract.getItemStatus(itemCode);
        console.log(status);

         dateOFManufacture = await SupplyChainContract.getItemDate(itemCode);
        console.log(dateOFManufacture);
        
      
      };
      
      const runMain = async () => {
        try {
          await main();
          // process.exit(0);
        } catch (error) {
          console.log(error);
          // process.exit(1);
        }
      };
      
       runMain();


       res.render('auth',{names,price,manufacturer,location,date});
})




app.listen(PORT, function(){
    console.log(`server is running on port ${PORT}.`);
})