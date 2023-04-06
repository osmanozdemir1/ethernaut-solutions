const { ethers } = require("hardhat");

const INSTANCE_ADDRESS = "0x6d3F9D8a41e85F86cc78dD71Db5d9F7996C9ACed";
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC_URL);
const account = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const deployedAddress = "0x51796e27aD97A8C5E66070Df7675aaE6240e4a1a";
const bytecode = "0x600a600c600039600a6000f3602a60405260206040f3"

async function main() {
    const instance = await ethers.getContractAt("MagicNumber", INSTANCE_ADDRESS);

    // Deploy the contract by sending a transaction with bytecode.
    const transferTx = await account.sendTransaction({from: account.address, data: bytecode});
    const attackReceipt = await transferTx.wait();
    console.log("attackReceipt: ", attackReceipt);

    // Call the instance to change the Solver address.
    const callTx = await instance.setSolver(deployedAddress);
    const callResp = await callTx.wait();
    console.log("calltx: ", callResp);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});