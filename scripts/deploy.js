const main = async () => {

    const SupplyChainContractFactory = await hre.ethers.getContractFactory('ItemManager');
    const SupplyChainContract = await SupplyChainContractFactory.deploy();
    await SupplyChainContract.deployed();
    console.log("Contract deployed to:", SupplyChainContract.address);

    let txn = await SupplyChainContract.createItem("Rolex", 1234, 34566);
    
   
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
  };
}
  
  runMain()