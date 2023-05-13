const main = async () => {

    const ProductContractFactory = await hre.ethers.getContractFactory('ProductContract');
    const ProductContract = await ProductContractFactory.deploy();
    await ProductContract.deployed();
    console.log("Contract deployed to:", ProductContract.address);

    //let txn = await SupplyChainContract.createItem("Rolex", 1234, 34566);
   
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