const cookieParser = require('cookie-parser');

const router = require('express').Router();
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
const {CONTRACT_ADDRESS} = process.env;




router.post('/createItem',async (req,res)=>{
    const productName = req.body.name
    const price = Number(req.body.price)
    const nameOfManufacturer = (req.body.nameOfManufacturer)
    const locationOfManufacture = (req.body.locationOfManufacture)
    const dateOFManufacture = (req.body.dateOfManufacture)
    let licenses = []

    async function main (){
        const SupplyChainContractFactory = await hre.ethers.getContractFactory('ItemManager');
        const SupplyChainContract = await SupplyChainContractFactory.attach(CONTRACT_ADDRESS);
        
        let txn =  await SupplyChainContract.createItem(itemName, price, finalDate);
        console.log(txn)

        itemCode = Number(await SupplyChainContract.getItemCode());
        console.log(itemCode);
       
      };
      
      const runMain = async () => {
        try {
          await main();
          process.exit(0);
        } catch (error) {
          console.log(error);
          process.exit(1);
        }
      };
      
       runMain();

       
        // res.cookie('status',"Item Created Successfully",{expires: new Date(Date.now()+1000), httpOnly:true});
        let string = `http://localhost:3000/api/qr/${itemCode}`;
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
