const hre = require("hardhat");
const { time } = require('@nomicfoundation/hardhat-network-helpers')

async function main() {
    const[TestingTime] = await hre.ethers.getSigners();
    console.log("Deploying contract with account: ", TestingTime.address);

    const startTime = await time.latest()
    const endTime = await startTime + 1000;
    const startBlockNumber = await time.latestBlock()
    const endBlockNumber = await startBlockNumber + 100

    const Instance = await hre.ethers.getContractFactory("TestingTime");
    const TestingTimeContract = await Instance.deploy(startTime, endTime, startBlockNumber, endBlockNumber);
    await TestingTimeContract.deployed()

    console.log("Contract deployed at: ", TestingTimeContract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  })

