const main = async () => {

    const ProductContractFactory = await hre.ethers.getContractFactory('ProductContract');
    const ProductContract = await ProductContractFactory.deploy();
    await ProductContract.deployed();
    console.log("Contract deployed to:", ProductContract.address);

   
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