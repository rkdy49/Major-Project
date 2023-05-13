async function main (){
  const SupplyChainContractFactory = await hre.ethers.getContractFactory('ItemManager');
  const SupplyChainContract = await SupplyChainContractFactory.attach('0x9Da8DC2aAdAaC8890dee95BC78952e20C26f79C8');
  
  console.log("Contract deployed to:", SupplyChainContract.address);
  // console.log(SupplyChainContract)
 

  // txn = await SupplyChainContract.triggerPayment(0);
  
  // console.log(txn)
 
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

