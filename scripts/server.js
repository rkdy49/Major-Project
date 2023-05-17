const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const qr = require('qrcode');
const {CONTRACT_ADDRESS} = process.env;

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

app.use('/Manufacturer', require('./routes/Manufacturer'));


app.get('/api/qr/:uuid',(req,res)=>{

    const itemId = req.params.uuid
   
    
    async function main (){

        const ProductContractFactory = await hre.ethers.getContractFactory('ProductContract');
        const ProductContract = await ProductContractFactory.attach(CONTRACT_ADDRESS);
        console.log(itemId)
        const info =  await ProductContract.getItemInfo(itemId);
        res.render('auth',{ itemName: info.itemName, itemId: itemId, itemPrice : info.itemPrice, nameOfManufacturer : info.nameOfManufacture, location: info.locationOfManufacture, date: info.dateOfManufacture});
        
      
      };
      
      const runMain = async () => {
        try {
          await main()
          // process.exit(0);
        } catch (error) {
          console.log(error);
          // process.exit(1);
        }
      };
      
       runMain();


      
})




app.listen(PORT, function(){
    console.log(`server is running on port ${PORT}.`);
})