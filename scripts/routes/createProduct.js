const router = require('express').Router();
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
const {CONTRACT_ADDRESS} = process.env;


router.post('/createProduct', (req,res)=>{
    let identifier = req.body.identifier;
    let price = Number(req.body.price);
    console.log(identifier);
    console.log(price);

    async function main (){
      const SupplyChainContractFactory = await hre.ethers.getContractFactory('ItemManager');
      const SupplyChainContract = await SupplyChainContractFactory.attach(CONTRACT_ADDRESS);
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


    res.redirect('/');

})





module.exports = router;

