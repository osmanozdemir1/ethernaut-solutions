# Ethernaut Solutions

This repository includes all the [ethernaut](https://ethernaut.openzeppelin.com/) contracts and the solutions for these challenges.

You can find challenge contracts and attacker contracts(if required) for every challenge in the `contracts` folder. You will also find the attacker scripts for every challenge in the `scripts` folder.

In the `deploy` folder, you will see *<mark>deployAttacker.js</mark>* file. Every time you want to complete a challenge, you need to deploy the attacker contract with this file. Don't forget to change the `INSTANCE_ADDRESS` variable and the contract name inside the `hre.ethers.getContractFactory("")` for that specific challenge.

For deploying: ```npx hardhat run deploy/deployAttacker.js --network goerli```

Examples for attacking (*depending on which challenge you are in*):  
```
npx hardhat run scripts/28-attackGatekeeperThree.js --network goerli  
npx hardhat run scripts/03-attackCoinFlip.js --network goerli
```

In some challenges, you will need a private key or Goerli RPC URL. You should create a `.env` file in your main folder and fill these with your variables:  
```
GOERLI_RPC_URL= 
PRIVATE_KEY= 
```

You can find my blog series about these challenges in [here](https://osmanozdemir.hashnode.dev/series/approach-to-ethernaut).
