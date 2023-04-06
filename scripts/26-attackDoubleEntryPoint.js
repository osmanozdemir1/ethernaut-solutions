// We don't need to attack in this challenge or call a function inside our bot contract.
// We only need to call the setDetectionBot function with our newly deployed bot contract.
// When you submit the challenge ethernaut will check if your bot is working.

const { ethers } = require("hardhat");

const INSTANCE_ADDRESS = "0xe8B77af5A5E97DA99F28c813594E79634D4D3550";
const BOT_ADDRESS = "0x8170561AFeDe215cba46dc4248A901413ab02292";

async function main() {
    const instance = await ethers.getContractAt("DoubleEntryPoint", INSTANCE_ADDRESS);

    // Get the forta variable of the instance.
    const fortaAddress = await instance.forta();
    const forta = await ethers.getContractAt("Forta", fortaAddress);

    // Call the setDetectionBot function with your deployed bot's address.
    const tx = await forta.setDetectionBot(BOT_ADDRESS);
    const resp = await tx.wait();
    console.log("resp: ", resp);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});