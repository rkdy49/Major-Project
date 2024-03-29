const cookieParser = require('cookie-parser');
const qr = require('qrcode');
const ShortUniqueId = require('short-unique-id');

const router = require('express').Router();
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
const {CONTRACT_ADDRESS} = process.env;




router.post('/createItem',async (req,res)=>{
    const itemName = req.body.itemName
    const itemPrice = Number(req.body.itemPrice)
    const nameOfManufacturer = (req.body.nameOfManufacturer)
    const locationOfManufacture = (req.body.locationOfManufacture)
    const dateOFManufacture = (req.body.dateOfManufacture)
    let licenses = []

    const uid = new ShortUniqueId({ length: 8 });

    const itemId = uid();
    console.log(itemId)

    async function main (){
        const ProductContractFactory = await hre.ethers.getContractFactory('ProductContract');
        const ProductContract = await ProductContractFactory.attach(CONTRACT_ADDRESS);
        
        let txn =  await ProductContract.createItem(itemId, [itemName, itemPrice, nameOfManufacturer, locationOfManufacture, dateOFManufacture, licenses]);
        console.log(txn)
        

      };
      
      const runMain = async () => {
        try {
          await main()
          process.exit(0);
        } catch (error) {
          console.log(error);
          process.exit(1);
        }
      };
      
       runMain();

       let string = `http://localhost:3000/api/qr/${itemId}`;
        qr.toDataURL(string, function (err, url) {
          if (err) {
            res.send('Error generating QR code');
          } else {
            // render the template and pass the QR code data as a variable
            res.render('qrcode', { qrCode: url ,string: string});
          }
        });
        
     
})





module.exports = router;
