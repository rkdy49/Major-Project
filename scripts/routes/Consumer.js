const router = require('express').Router();
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
const {CONTRACT_ADDRESS} = process.env;

router.post('/search',(req,res)=>{
    let itemCode = Number(req.body.identifier);
    async function main (){
        const SupplyChainContractFactory = await hre.ethers.getContractFactory('ItemManager');
        const SupplyChainContract = await SupplyChainContractFactory.attach(CONTRACT_ADDRESS);
        
        let itemName =  await SupplyChainContract.getItemIdentifier(itemCode);
        console.log(itemName);


        let status = await SupplyChainContract.getItemStatus(itemCode);
        console.log(status);

        let dateOFManufacture = await SupplyChainContract.getItemDate(itemCode);
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
       res.redirect("/signin")

})



module.exports = router;