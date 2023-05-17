const {CONTRACT_ADDRESS} = process.env;

const main = async () => {

    const ProductContractFactory = await hre.ethers.getContractFactory('ProductContract');
    const ProductContract = await ProductContractFactory.attach(CONTRACT_ADDRESS);
    
    // let txn =  await ProductContract.createItem('xyz', ['xyz', 123, 'xyz', 'xyz', 'xyz', []]);
    // console.log(txn)
    const info =  await ProductContract.getItemInfo("MmA5DXmh");
    console.log(info)
   
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