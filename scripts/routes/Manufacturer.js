const cookieParser = require('cookie-parser');

const router = require('express').Router();
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
const {CONTRACT_ADDRESS} = process.env;




router.post('/createItem',(req,res)=>{
    let itemName = req.body.name;
    let price = Number(req.body.price);
    let itemCode
    let date = new Date();
    let dateString = JSON.stringify(date);
    let finalDate = dateString.substring(1,11);
    console.log(finalDate);

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
          // process.exit(0);
        } catch (error) {
          console.log(error);
          // process.exit(1);
        }
      };
      
       runMain();

       
      res.cookie('status',"Item Created Successfully",{expires: new Date(Date.now()+1000), httpOnly:true});
      // res.cookie('code',itemCode,{expires: new Date(Date.now()+1000), httpOnly:true});

       res.redirect("/signin")

      // itemCode = JSON.stringify(itemCode)
      //  let name = req.cookies.name
      // res.render("manufacturer",{name:name,status:`Item created successfully! ${itemCode}`})
})


// QR generate & render
// add image for certificates 
// add history of products of a manufacturer

router.post('/search',(req,res)=>{
    let itemCode = Number(req.body.itemCode);
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


       res.cookie('status',"Item Found Successfully!",{expires: new Date(Date.now()+1000), httpOnly:true});
      //  res.cookie('item',itemName,{expires: new Date(Date.now()+1000), httpOnly:true});
      //  res.cookie('state',status,{expires: new Date(Date.now()+1000), httpOnly:true});
      //  res.cookie('time',dateOFManufacture,{expires: new Date(Date.now()+1000), httpOnly:true});

       res.redirect("/signin")
      //  let name = req.cookies.name
      //  res.render('manufacturer',{name:name,status:"Item found!"})
    
})

module.exports = router;